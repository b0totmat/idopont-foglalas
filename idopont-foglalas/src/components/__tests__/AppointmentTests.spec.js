import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import NewAppointmentView from '@/views/NewAppointmentView.vue'

import { useAppointmentStore } from '@/stores/appointments'
import { createPinia, setActivePinia } from 'pinia'

describe('Appointments', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders existing appointments', async () => {
    const appointmentStore = useAppointmentStore()
    await appointmentStore.getAppointments()

    const wrapper = mount(HomeView)
    expect(wrapper.text()).toContain('2025-03-')
  })

  it('inserts new appointment', async () => {
    const appointmentStore = useAppointmentStore()
    await appointmentStore.getAppointments()

    const wrapperNewAppointment = mount(NewAppointmentView)
    const inputs = wrapperNewAppointment.findAll('input')
    const select = wrapperNewAppointment.find('select')

    inputs[0].element.value = '+36304417892'
    inputs[1].element.value = 'Ő Zike'
    inputs[2].element.value = '2025-03-06'
    select.element.value = '12:00:00'

    appointmentStore.saveNewAppointment({
      mobile: inputs[0].element.value,
      name: inputs[1].element.value,
      date: inputs[2].element.value,
      time: select.element.value
    })

    const wrapperHome = mount(HomeView)
    await appointmentStore.getAppointments()
    expect(wrapperHome.text()).toContain('2025-03-06/12:00:00')
  })

  it('shows errors', async () => {
    const appointmentStore = useAppointmentStore()
    await appointmentStore.getAppointments()

    const wrapper = mount(NewAppointmentView)
    const inputs = wrapper.findAll('input')
    const select = wrapper.find('select')

    inputs[0].element.value = ''
    inputs[1].element.value = 'Ő Zike'
    inputs[2].element.value = '2025-03-06'
    select.element.value = '12:00:00'
    
    appointmentStore.saveNewAppointment({
      mobile: inputs[0].element.value,
      name: inputs[1].element.value,
      date: inputs[2].element.value,
      time: select.element.value
    })

    expect(appointmentStore.errors).toContain('A telefonszám mező kitöltése kötelező!')
  })
})
