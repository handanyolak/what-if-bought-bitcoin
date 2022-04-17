import { shallowMount } from '@vue/test-utils'
import DatePicker from '@/components/DatePicker.vue'

describe('DatePicker', () => {
  const wrapper = shallowMount(DatePicker, {
    propsData: {
      maxDate: '2022-04-17',
      minDate: '2017-08-18',
    },
  })
  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  test('checks the prop minDate', () => {
    expect(wrapper.props().minDate).toBe('2017-08-18')
  })

  test('checks the prop maxDate', () => {
    expect(wrapper.props().maxDate).toBe('2022-04-17')
  })
})
