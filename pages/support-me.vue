<template>
  <div class="min-h-screen items-center justify-center">
    <div class="flex items-center justify-center">
      <div
        class="glass mx-8 mt-24 w-full max-w-4xl rounded-2xl px-2 py-14 md:mx-20 md:p-12"
      >
        <div v-if="provider">
          <div v-if="Boolean(isConnected)">
            <v-row
              align="center"
              :class="`${
                !$vuetify.breakpoint.smAndDown
                  ? 'space-x-6'
                  : 'mx-2 grid grid-cols-1 gap-y-5 space-x-0'
              }`"
              justify="center"
            >
              <v-tooltip bottom content-class="text-xs">
                <template #activator="{ on, attrs }">
                  <span
                    v-ripple="{ center: true }"
                    v-bind="attrs"
                    class="app-title border-gradient-br-pink-yellow-gray-900 my-auto cursor-pointer rounded-md border-2 border-solid border-transparent p-3 text-center text-gray-100 shadow-xl"
                    v-on="on"
                    @click="copyText(address)"
                  >
                    Address:
                    {{ formatAddressToDisplay(address) }}
                  </span>
                </template>
                <span>
                  {{ address }}
                </span>
              </v-tooltip>
              <span
                class="app-title border-gradient-br-pink-yellow-gray-900 my-auto rounded-md border-2 border-solid border-transparent p-3 text-center text-gray-100 shadow-xl"
              >
                Balance: {{ formatBalanceToDisplay(balance) }}
              </span>
            </v-row>
            <ValidationObserver ref="observer" v-slot="{ invalid }">
              <v-row class="mt-10 flex justify-center">
                <ValidationProvider
                  v-slot="{ errors }"
                  class="flex justify-center"
                  name="amount"
                  :rules="{
                    required: true,
                    decimal: true,
                    min: 1,
                    max: 8,
                    min_value: 0.000001,
                    max_value: formatBalanceToDisplay(balance),
                  }"
                >
                  <v-text-field
                    v-model="amount"
                    class="mx-4 max-w-sm"
                    :counter="8"
                    :error-messages="errors"
                    :hint="!Boolean(amount) ? 'For example, `0.01`' : ''"
                    label="Amount"
                    name="amount"
                    :prepend-inner-icon="mdiCurrencyUsdOff"
                    :success="
                      !Boolean(Object.keys(errors).length) && Boolean(amount)
                    "
                  ></v-text-field>
                </ValidationProvider>
              </v-row>
              <v-row align="center" justify="center">
                <div class="flex flex-col items-center justify-center">
                  <button
                    class="connect-button my-5 rounded-xl py-1 px-5 outline-none"
                    :disabled="invalid || Boolean(spinner)"
                    @click="send"
                  >
                    <span>Send</span>
                  </button>
                  <svg
                    v-if="spinner"
                    class="mr-3 h-4 w-4 animate-spin text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-75"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </v-row>
            </ValidationObserver>
            <div class="mt-8 text-center text-sm">
              Note: All chains are supported. (Including Testnets for testing
              this feature.)
            </div>
            <div
              v-if="txHash || txStatus || confirmationCount"
              class="information mt-5 flex flex-col items-center space-y-1 rounded-2xl p-5 text-center text-sm"
            >
              <div v-if="txHash" class="break-words">
                Transaction Hash: {{ txHash }}
              </div>
              <div v-if="txStatus">Status: {{ txStatus }}</div>
              <div v-if="confirmationCount">
                Confirmation Progress:
                {{ confirmationCount }}/{{ totalConfirmationCount }}
              </div>
            </div>
            <div class="flex justify-center">
              <button
                class="connect-button mt-12 cursor-pointer rounded-xl px-3 py-1 outline-none md:px-5"
                @click="disconnectWeb3"
              >
                Disconnect to Metamask
              </button>
            </div>
          </div>
          <div v-else class="flex items-center justify-center">
            <button
              class="connect-button my-10 cursor-pointer rounded-xl py-1 px-5 outline-none"
              @click="connectWeb3"
            >
              Connect to Metamask
            </button>
          </div>
        </div>
        <div v-else class="flex items-center justify-center">
          <a
            class="connect-button my-10 cursor-pointer rounded-xl py-1 px-5 text-white outline-none"
            href="https://metamask.io/download/"
            target="_blank"
          >
            Install Metamask
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    ref,
    useContext,
    useMeta,
  } from '@nuxtjs/composition-api'

  import Web3 from 'web3'
  import detectEthereumProvider from '@metamask/detect-provider'
  import { mdiCurrencyUsdOff } from '@mdi/js'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  export default defineComponent({
    // components
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    // setup
    setup() {
      // meta
      useMeta({
        title: 'Support Me',
      })

      // context
      const { $config } = useContext()

      // root variables
      const $vToastify = getCurrentInstance().proxy.$vToastify

      // refs
      const observer = ref(null)

      // constants
      const ownerAddress = $config.ownerAddress.toLowerCase()
      const totalConfirmationCount = ref(0)
      const confirmationCount = ref(0)
      const balance = ref(0)
      const isConnected = ref(false)
      const spinner = ref(false)
      const provider = ref(null)
      const address = ref(null)
      let web3 = null
      const txStatus = ref('')
      const amount = ref('')
      const txHash = ref('')

      // hooks
      onMounted(async () => {
        await checkProvider()

        if (provider.value) {
          // create web3 instance
          web3 = new Web3(provider.value)

          // set total confirmation count
          web3.eth.transactionConfirmationBlocks = 5
          totalConfirmationCount.value = web3.eth.transactionConfirmationBlocks
        }
      })

      // methods
      const checkProvider = async () => {
        // Check for web3 provider
        provider.value = await detectEthereumProvider({
          mustBeMetaMask: true,
          silent: true,
          timeout: 3000,
        })
      }

      const connectWeb3 = async () => {
        try {
          // if No web3 provider
          if (!provider.value) {
            throw new Error('No web3 provider detected.')
          }

          // Ask to connect
          await web3.eth.requestAccounts()

          // get address, balance etc.
          await updateUserInfo()

          // Check connecting
          isConnected.value =
            (await web3.eth.net.isListening()) || provider.value.isConnected()

          if (!isConnected.value) {
            throw new Error('Connect Error.')
          }

          // started eth events
          await startEthEvents()

          $vToastify.success('Connected.')
        } catch (error) {
          // User denied account access
          $vToastify.error(String(error.message))
        }
      }

      const send = async () => {
        try {
          // validate
          const validate = await observer.value.validate()

          if (!validate) {
            throw new Error('Validation Error.')
          }

          // send tx
          await web3.eth
            .sendTransaction({
              from: address.value,
              to: ownerAddress,
              value: web3.utils.toWei(amount.value, 'ether'),
            })
            .once('sent', handleTransactionSent)
            .once('sending', handleTransactionSending)
            .once('transactionHash', handleTransactionHash)
            .once('receipt', handleTransactionReceipt)
            .on('confirmation', handleTransactionConfirmation)
            .on('error', handleTransactionError)
        } catch (error) {
          if (error) {
            $vToastify.error(String(error?.message))
          }
        }
      }

      const disconnectWeb3 = async () => {
        $vToastify.success('Disconnected.')

        // reset events
        await stopEthEvents()

        // reload to
        location.reload()
      }

      const updateUserInfo = async (_address = null) => {
        // Get user address and balance
        if (!_address) {
          address.value = (await web3.eth.getAccounts())[0].toLowerCase()
        } else {
          address.value = _address.toLowerCase()
        }

        balance.value = web3.utils.fromWei(
          await web3.eth.getBalance(address.value),
          'ether'
        )
      }

      const startEthEvents = () => {
        // Start eth events
        provider.value.on('chainChanged', handleChainChanged)
        provider.value.on('accountsChanged', handleAccountsChanged)
        provider.value.on('disconnect', handleDisconnect)
      }

      const handleTransactionSent = () => {
        spinner.value = true
        $vToastify.info('Transaction Status: Transaction sent to Metamask.')
      }

      const handleTransactionSending = () => {
        $vToastify.info('Transaction Status: Waiting to user confirm.')
      }

      const handleTransactionHash = (_txHash) => {
        // tx created event
        $vToastify.info(
          'Transaction Status: Awaiting transaction confirmation.'
        )

        txHash.value = _txHash
        txStatus.value = 'Awaiting transaction confirmation.'

        // reset inputs
        resetInputs()
      }

      const handleTransactionReceipt = async () => {
        // tx created successfully event
        $vToastify.success('Transaction Status: Awaiting block confirmation.')

        // to update user balance
        await updateUserInfo()

        // preparing confirmation count
        confirmationCount.value = '0'
        txStatus.value = 'Awaiting block confirmation.'

        $vToastify.info('Thank You For Your Support!')
      }

      const handleTransactionConfirmation = (_confirmationCount) => {
        // tx confirmation event
        if (
          _confirmationCount > 0 &&
          _confirmationCount <= totalConfirmationCount.value
        ) {
          confirmationCount.value = _confirmationCount
          $vToastify.info('Confirmation Status: New block found.')
        }

        if (_confirmationCount >= totalConfirmationCount.value) {
          txStatus.value = 'Confirmed.'
          resetTxDetails()
          $vToastify.success('Transaction Status: Confirmed.')
        }
      }

      const handleTransactionError = () => {
        // tx error event
        txStatus.value = 'Failed.'
        resetTxDetails()
        $vToastify.error('Transaction Status: Failed.')
      }

      const resetInputs = () => {
        // removed fields and reset validate
        observer.value.reset()
        amount.value = ''
      }

      const resetTxDetails = () => {
        // removed tx details for sustainability
        txStatus.value = ''
        txHash.value = ''
        totalConfirmationCount.value = 0
        confirmationCount.value = 0
        spinner.value = false
      }

      const stopEthEvents = () => {
        // Start eth events
        provider.value.removeListener('chainChanged', handleChainChanged)
        provider.value.removeListener('accountsChanged', handleAccountsChanged)
      }

      const handleChainChanged = async () => {
        // eth change chain event
        await updateUserInfo()
        $vToastify.success('Chain has changed.')
      }

      const handleAccountsChanged = async (accounts) => {
        // eth change account event
        const _address = accounts[0]

        if (accounts.length > 0) {
          await updateUserInfo(_address)
          $vToastify.success(`Linked account changed to '${_address}'`)
        } else {
          $vToastify.warning('Linked account not found. Page will be reloaded.')
          location.reload()
        }
      }

      const handleDisconnect = async () => {
        await stopEthEvents()
        // eth disconnect event
        location.reload()
      }

      const formatAddressToDisplay = (address) => {
        // address value formatted to user
        return (
          address.substring(0, 4) +
          '...' +
          address.substring(address.length - 4)
        )
      }

      const formatBalanceToDisplay = (balance) => {
        // balance value formatted to user
        return (+balance).toFixed(6)
      }

      const copyText = async (text) => {
        // copy to clipboard
        try {
          await navigator.clipboard.writeText(text)
        } catch (error) {
          // suppressed error
          return null
        }
      }

      // return
      return {
        totalConfirmationCount,
        formatAddressToDisplay,
        formatBalanceToDisplay,
        mdiCurrencyUsdOff,
        confirmationCount,
        disconnectWeb3,
        isConnected,
        connectWeb3,
        provider,
        observer,
        txStatus,
        copyText,
        address,
        spinner,
        balance,
        amount,
        txHash,
        send,
      }
    },
    // head
    head: {},
  })
</script>

<style>
  .glass {
    background: rgba(47, 103, 191, 0.14);
    box-shadow: 0px 2px 20px 8px rgb(255 255 255 / 10%);
    border-right: 1px solid rgba(47, 103, 191, 0.14);
    border-bottom: 1px solid rgba(47, 103, 191, 0.14);
    backdrop-filter: blur(10px);
  }
  .connect-button {
    transition: 0.3s ease;
    border: 2px solid #f13d7d;
  }

  .connect-button:hover {
    box-shadow: 0px 0px 8px 0px rgb(241 61 125 / 88%);
  }

  .connect-button:disabled {
    cursor: not-allowed;
    pointer-events: all !important;
  }

  .information {
    box-shadow: 0px 0px 35px -15px rgb(28 50 60 / 34%);
  }
</style>
