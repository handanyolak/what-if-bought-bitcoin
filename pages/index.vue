<template>
  <div class="min-h-screen items-center justify-center">
    <div class="flex items-center justify-center">
      <div class="glass mx-5 w-full max-w-screen-2xl p-4 md:mx-20">
        <ValidationObserver ref="observer" v-slot="{ invalid }">
          <div class="flex flex-col items-center space-y-5 py-10 md:px-20">
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
              class="try-button mt-10 cursor-pointer rounded-xl py-1 px-28 outline-none"
              :disabled="invalid"
              @click="onSubmit"
            >
              Try
            </button>
            <div
              class="grid grid-cols-1 justify-center justify-items-center md:grid-cols-2"
            >
              <div v-if="profit" class="md:text-xl">
                <label class="font-medium">Profit: </label>
                <span class="font-medium">%{{ profit }}</span>
              </div>
              <div v-if="currentAmount" class="md:text-xl">
                <label class="font-medium">Current Amount:</label>
                <span class="font-medium">{{ currentAmount }}</span>
              </div>
            </div>
          </div>
        </ValidationObserver>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { getCurrentInstance, ref, useContext } from '@nuxtjs/composition-api'
  import { ValidationObserver, ValidationProvider } from 'vee-validate'
  import { mdiCurrencyUsd } from '@mdi/js'

  import DatePicker from '~/components/DatePicker.vue'

  // context
  const { $axios } = useContext()

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
  const inflationRate = ref(1)
  const amount = ref('')
  const currentAmount = ref('')
  const profit = ref(null)

  // methods
  const onSubmit = async () => {
    try {
      // validate
      const validate = await observer.value.validate()

      if (!validate) {
        throw new Error('Validation Error.')
      }

      await getOldPrice()
      await getCurrentPrice()
      if (inflation.value) {
        await calculateInflation()
      }
      await calculateProfit()
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
        // TODO: order by timestamp
        // m = is buyer? M = is best price? and get first item's price
        oldPrice.value = data.filter(
          (item) => item.m === true && item.M === true
        )[0].p
      })
      .catch((error) => {
        return error
        /* console.log(error) */
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
      .catch((error) => {
        return error
        /* console.log(error) */
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
      .catch((error) => {
        return error
        /* console.log(error) */
      })
  }

  const calculateProfit = () => {
    profit.value = (currentPrice.value / oldPrice.value) * 100
    currentAmount.value =
      (amount.value * inflationRate.value * profit.value) / 100
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
    padding: 10px;
    border-radius: 20px;
    color: #fff;
    font-size: 18px;
    background: rgba(47, 103, 191, 0.14);
    box-shadow: 0px 2px 20px 8px rgb(255 255 255 / 10%);
    border-right: 1px solid rgba(47, 103, 191, 0.14);
    border-bottom: 1px solid rgba(47, 103, 191, 0.14);
    backdrop-filter: blur(10px);
    transition: 0.5s ease;
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

  /* .v-application .cyan--text.text--accent-4 {
    color: #f13d7d !important;
  } */

  .v-text-field--outlined fieldset {
    color: red !important;
  }

  .theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
    border-color: #f13d7d !important;
  }
</style>
