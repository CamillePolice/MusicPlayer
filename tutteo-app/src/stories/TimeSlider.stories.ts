import { ref } from 'vue'
import type { Meta, StoryFn } from '@storybook/vue3'
import TimeSlider from '@/components/sliders/TimeSlider.vue'
import { Howl } from 'howler'

export default {
  title: 'Components/TimeSlider',
  component: TimeSlider,
  argTypes: {
    isPlaying: { control: 'boolean' },
  },
} as Meta

const Template: StoryFn = (args) => ({
  components: { TimeSlider },
  setup() {
    const sound = new Howl({
      src: ['./assets/stylish-deep-electronic-262632.mp3'],
      html5: true,
      autoplay: false,
    })

    return { args, sound }
  },
  template: `
    <div>
      <TimeSlider :sound="sound" :isPlaying="args.isPlaying" />
    </div>
  `,
})

// Default story
export const Default = Template.bind({})
Default.args = {
  isPlaying: false,
}

// Playing story
export const Playing = Template.bind({})
Playing.args = {
  isPlaying: true,
}
