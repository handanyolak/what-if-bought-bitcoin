<template>
  <v-date-picker
    v-model="startTime"
    class="rounded-xl border-none"
    full-width
    :max="maxDate"
    :min="minDate"
    @change="onChange"
  ></v-date-picker>
</template>
<script>
  import { defineComponent, ref } from '@nuxtjs/composition-api'

  export default defineComponent({
    // props
    props: {
      minDate: {
        type: String,
        default() {
          return ''
        },
        required: true,
      },
      maxDate: {
        type: String,
        default() {
          return ''
        },
        required: true,
      },
    },
    emits: ['selected-time'],
    // setup
    setup(_, { emit }) {
      // constants
      const startTime = ref(null)

      // methods
      const onChange = () => {
        emit('selected-time', startTime)
      }

      // return
      return {
        startTime,
        onChange,
      }
    },
  })
</script>
