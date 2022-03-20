<template>
  <div class="min-h-screen items-center justify-center">
    <div class="flex items-center justify-center">
      <div class="glass mx-5 w-full max-w-screen-2xl rounded-2xl p-5 md:mx-20">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <div class="flex flex-col items-center space-y-5 py-10 lg:px-20">
            <ValidationProvider
              v-slot="{ errors }"
              class="flex justify-center"
              name="amount"
              :rules="{
                required: true,
                min: 10,
                max: 10,
              }"
            >
              <DatePicker
                v-model="startTime"
                :error-messages="errors"
                :max-date="maxDate"
                :min-date="minDate"
                @selected-time="selectedTime($event)"
              ></DatePicker>
            </ValidationProvider>
            <ValidationProvider
              v-slot="{ errors }"
              class="flex justify-center"
              name="amount"
              :rules="{
                required: true,
                decimal: true,
                min: 1,
                max: 15,
                min_value: 1,
                max_value: 100000000000000,
              }"
            >
              <v-text-field
                v-model="amount"
                :counter="15"
                :error-messages="errors"
                label="Amount"
                name="amount"
                :prepend-inner-icon="mdiCurrencyUsd"
                :success="
                  !Boolean(Object.keys(errors).length) && Boolean(amount)
                "
              ></v-text-field>
            </ValidationProvider>
            <v-checkbox
              v-model="inflation"
              color="cyan accent-4"
              dense
              hide-details
              label="Inflation"
              name="inflation"
            ></v-checkbox>
            <button
              class="try-button mt-10 rounded-xl border-[#f13d7d] py-1 px-28 outline-none"
              :disabled="invalid"
              @click="onSubmit"
            >
              Try
            </button>
            <div
              class="grid grid-cols-1 justify-center gap-x-10 gap-y-5 md:grid-cols-2"
            >
              <div
                v-if="oldPrice"
                class="rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"
              >
                <label class="font-medium">Old Price: </label>
                <span class="font-medium">{{
                  parseFloat(oldPrice).toFixed(2)
                }}</span>
              </div>

              <div
                v-if="currentPrice"
                class="rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"
              >
                <label class="font-medium">Current Price:</label>
                <span class="font-medium">{{
                  parseFloat(currentPrice).toFixed(2)
                }}</span>
              </div>
            </div>
            <div class="grid grid-cols-1 justify-center gap-x-10 gap-y-5">
              <div
                v-if="inflationRate"
                class="rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"
              >
                <label class="font-medium">Inflation Rate: </label>
                <span class="font-medium">{{ inflationRate.toFixed(2) }}</span>
              </div>
            </div>
            <div
              class="grid grid-cols-1 justify-center gap-x-10 gap-y-5 md:grid-cols-2"
            >
              <div
                v-if="profit"
                class="rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"
              >
                <label class="font-medium">Profit: </label>
                <span class="font-medium">%{{ parseInt(profit) }}</span>
              </div>
              <div
                v-if="currentAmount"
                class="rounded-xl p-5 text-center text-sm shadow-2xl md:text-xl"
              >
                <label class="font-medium">Current Amount:</label>
                <span class="font-medium">{{ currentAmount.toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    getCurrentInstance,
    onBeforeUnmount,
    onMounted,
    ref,
    useContext,
  } from '@nuxtjs/composition-api'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { mdiCurrencyUsd } from '@mdi/js'

  import DatePicker from '~/components/DatePicker.vue'

  // context
  const { $axios, $recaptcha } = useContext()

  // root variables
  const $vToastify = getCurrentInstance().proxy.$vToastify

  // refs
  const observer = ref(null)

  // const
  const startTime = ref(null)
  const maxDate = new Date().toISOString().split('T')[0]
  const minDate = '2017-08-18'
  const binanceUrl = 'https://api.binance.com/api/v3'
  const inflationUrl = 'https://www.statbureau.org'
  const pair = 'BTCUSDT'
  const oldPrice = ref(null)
  const currentPrice = ref(null)
  const inflation = ref(false)
  const inflationRate = ref(null)
  const amount = ref('')
  const currentAmount = ref('')
  const profit = ref(null)
  const profitRate = ref(null)

  // hooks
  onMounted(async () => {
    await $recaptcha.init()
  })

  onBeforeUnmount(() => {
    $recaptcha.destroy()
  })

  // methods
  const onSubmit = async () => {
    try {
      // recaptcha validation
      await $recaptcha.execute('login')

      // vee-validate
      const validate = await observer.value.validate()

      if (!validate) {
        throw new Error('Validation Error.')
      }

      if (startTime.value === null) {
        throw new Error('Please Select a Date')
      }

      await getOldPrice()
      await getCurrentPrice()

      if (inflation.value) {
        await calculateInflation()
      } else {
        inflationRate.value = null
      }

      await calculateProfit()
      $vToastify.success('Success')
    } catch (error) {
      if (error) {
        $vToastify.error(String(error?.message))
      }
    }
  }

  const getOldPrice = async () => {
    await $axios
      .$get(`${binanceUrl}/aggTrades`, {
        params: {
          symbol: pair,
          startTime: getStartTime(startTime.value),
          endTime: getEndTime(startTime.value),
        },
      })
      .then((data) => {
        // m = is buyer? M = is best price? and get first item's price
        oldPrice.value = data.filter((item) => item.m === true)[0].p
      })
  }

  const getCurrentPrice = async () => {
    await $axios
      .$get(`${binanceUrl}/avgPrice`, {
        params: {
          symbol: pair,
        },
      })
      .then((data) => {
        // get current price
        currentPrice.value = data.price
      })
  }

  const calculateInflation = async () => {
    await $axios
      .$get(`${inflationUrl}/calculate-inflation-price-jsonp`, {
        params: {
          country: 'united-states',
          start: startTime.value,
          end: maxDate,
          amount: 100, // hard coded
          format: false,
        },
      })
      .then((data) => {
        // calculate inflation rate
        inflationRate.value =
          100 / +data.substring(0, data.length - 2).substring(2)
      })
  }

  const calculateProfit = () => {
    profitRate.value = currentPrice.value / oldPrice.value
    currentAmount.value =
      amount.value *
      profitRate.value *
      (inflationRate.value ? inflationRate.value : 1)
    profit.value = ((currentAmount.value - amount.value) / amount.value) * 100
  }

  const getStartTime = (date) => {
    return Date.parse(date)
  }

  const selectedTime = (date) => {
    startTime.value = date.value
  }

  const getEndTime = (date) => {
    return Date.parse(date) + 1000 * 60 * 5 // add 1 min
  }
</script>

<style>
  .glass {
    background: rgba(47, 103, 191, 0.14);
    box-shadow: 0px 2px 20px 8px rgb(255 255 255 / 10%);
    border-right: 1px solid rgba(47, 103, 191, 0.14);
    border-bottom: 1px solid rgba(47, 103, 191, 0.14);
    backdrop-filter: blur(10px);
  }

  .try-button {
    transition: 0.3s ease;
    border: 2px solid #f13d7d;
  }

  .try-button:hover {
    box-shadow: 0px 0px 8px 0px rgb(241 61 125 / 88%);
  }

  .try-button:disabled {
    cursor: not-allowed;
    pointer-events: all !important;
  }

  /* Vuetify */
  .v-picker--date {
    background: rgba(241, 61, 125, 0.4) !important;
    border-radius: 15px !important;
  }

  .v-picker__body {
    background: transparent !important;
  }

  .v-text-field--outlined fieldset {
    color: red !important;
  }

  .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: #f13d7d !important;
  }

  .vt-notification {
    background-color: #f13d7c54 !important;
  }
</style>
