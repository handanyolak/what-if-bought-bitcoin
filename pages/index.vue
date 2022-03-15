<template>
  <div class="items-center justify-center min-h-screen">
    <div class="flex justify-between p-5">
      <img
        class="p-10"
        src="../assets/images/logo.svg"
        alt="what if bought bitcoin"
      />
      <button
        class="relative flex justify-center w-64 h-10 m-5 text-xl font-bold text-center rounded-md cursor-pointer button"
      >
        Coffee With Crypto
      </button>
    </div>
    <div class="flex items-center justify-center">
      <div class="w-full p-4 mx-5 md:mx-20 glass max-w-screen-2xl">
        <div class="flex flex-col items-center px-20 py-10 space-y-5">
          <v-date-picker
            v-model="startTime"
            :min="minDate"
            full-width
            :max="maxDate"
            class="border-none w-80 rounded-xl"
          ></v-date-picker>
          <v-text-field
            v-model="amount"
            color="cyan accent-4"
            label="Amount *"
          ></v-text-field>
          <v-checkbox
            v-model="inflation"
            dense
            label="Inflation?"
            color="cyan accent-4"
            hide-details
          ></v-checkbox>
          <button
            class="py-1 mt-10 outline-none cursor-pointer px-28 rounded-xl try-button"
            @click="onSubmit"
          >
            Try
          </button>
          <div class="grid justify-center grid-cols-2 justify-items-center">
            <div v-if="profit" class="text-2xl">
              <label class="font-semibold">Profit: </label>
              <span class="font-semibold">%{{ profit }}</span>
            </div>
            <div v-if="currentAmount" class="text-2xl">
              <label class="font-semibold">Current Amount:</label>
              <span class="font-semibold">{{ currentAmount }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, useContext } from '@nuxtjs/composition-api'
import { mdiHeart } from '@mdi/js'

// context
const { $axios } = useContext()

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

// methods
const onSubmit = async () => {
  await getOldPrice()
  await getCurrentPrice()
  if (inflation.value) {
    await calculateInflation()
  }
  await calculateProfit()

  /* if (checked.value) {} */
}

const getOldPrice = async () => {
  console.log(startTime.value)
  await $axios
    .$get(`${binanceUrl}/aggTrades`, {
      params: {
        symbol: pair,
        startTime: getStartTime(startTime.value),
        endTime: getEndTime(startTime.value),
      },
    })
    .then((data) => {
      // TODO: burayi timestamp'e gore sirala
      // m = is buyer? M = is best price? and get first item's price
      oldPrice.value = data.filter(
        (item) => item.m === true && item.M === true
      )[0].p
      console.log(oldPrice.value)
    })
    .catch((error) => {
      console.log(error)
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
      console.log(currentPrice.value)
    })
    .catch((error) => {
      console.log(error)
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
      // reduced amount by inflation rate
      amount.value = amount.value * inflationRate.value
    })
    .catch((error) => {
      console.log(error)
    })
}

const calculateProfit = () => {
  profit.value = (currentPrice.value / oldPrice.value) * 100
  currentAmount.value = (amount.value * profit.value) / 100
}

const getStartTime = (date) => {
  return Date.parse(date)
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

/* Vuetify */
.v-picker--date {
  background: rgba(241, 61, 125, 0.4) !important;
  border-radius: 15px !important;
}
.v-picker__body {
  background: transparent !important;
}

.v-application .cyan--text.text--accent-4 {
  color: #f13d7d !important;
}

.v-text-field--outlined fieldset {
  color: red !important;
}

.theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  border-color: #f13d7d !important;
}

@property --rotate {
  syntax: '<angle>';
  initial-value: 132deg;
  inherits: false;
}

.button:hover {
  color: #f13d7d;
  transition: color 1s;
}
.button:hover:before,
.button:hover:after {
  animation: none;
  opacity: 0;
}

.button::before {
  content: '';
  width: 100%;
  height: 8%;
  border-radius: 8px;
  background-image: linear-gradient(
    var(--rotate),
    #da12cc,
    #f13d7d 43%,
    #eed11d
  );
  position: absolute;
  bottom: 0;
  animation: spin 2.5s linear infinite;
}

.button::after {
  position: absolute;
  content: '';
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  transform: scale(0.8);
  filter: blur(calc(250px / 6));
  background-image: linear-gradient(
    var(--rotate),
    #da12cc,
    #f13d7d 43%,
    #eed11d
  );
  transition: opacity 0.5s;
  animation: spin 2.5s linear infinite;
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }
  100% {
    --rotate: 360deg;
  }
}
</style>
