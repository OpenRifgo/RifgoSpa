<template>

  <div
    v-for="(itm, i) of buttons"
    v-bind:key="i"
    class="text-white inline-block"
  >
    <template v-if="itm.type === 'paidQuestion'">
      <q-img
        v-if="(isDesktop || isMaximized) && itm.lgImg"
        :src="itm.lgImg"
        :style="{'max-height': '100px'}"
        fit="scale-down"
        ratio="1"
        @click="onCustomButtonClick(itm)"
      />

      <q-btn
        v-if="isDesktop || isMaximized"
        text-color="white"
        size="1.15rem"
        rounded
        no-caps
        :style="{'border-radius': '0.6rem', 'background-color': itm.color}"
        @click="onCustomButtonClick(itm)"
        class="q-mr-sm"
      >
        {{ itm.name }}
      </q-btn>

      <q-btn
        v-else
        flat dense round size="lg"
        class="q-mr-sm"
        no-caps
        text-color="white"
        :style="{'background-color': itm.color}"
        @click="onCustomButtonClick(itm)"
      >
        {{ itm.smLabel }}
        <q-tooltip>{{ itm.name }}</q-tooltip>
      </q-btn>
    </template>

    <template v-else-if="itm.type === 'link'">
      <a :href="itm.url" target="_blank">
        <q-img
          v-if="(isDesktop || isMaximized) && itm.lgImg"
          :src="itm.lgImg"
          :style="{'max-height': '100px'}"
          fit="scale-down"
          ratio="1"
        />
      </a>

      <q-btn
        v-if="isDesktop || isMaximized"
        text-color="white"
        size="1.15rem"
        rounded
        no-caps
        :style="{'border-radius': '0.6rem', 'background-color': itm.color}"
        type="a"
        target="_blank"
        :href="itm.url"
        class="q-mr-sm"
      >
        {{ itm.name }}
      </q-btn>

      <q-btn
        v-else
        flat dense round size="lg"
        class="q-mr-sm"
        text-color="white"
        :style="{'background-color': itm.color}"
        no-caps
        type="a"
        target="_blank"
        :href="itm.url"
      >
        {{ itm.smLabel }}
        <q-tooltip>{{ itm.name }}</q-tooltip>
      </q-btn>
    </template>

    <template v-else-if="itm.type === 'image'">
      <div>
        <q-img
          v-if="(isDesktop || isMaximized) && itm.lgImg"
          :src="itm.lgImg"
          style="width: 200px; height: 50px"
        />
      </div>
    </template>
  </div>

</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {IEventCustomButton} from 'src/models/EventModels'
import {logError} from '../../lib/logger'
import {IDonateConfig} from 'components/models'

export default defineComponent({
  props: {
    buttons: {
      type: Array as PropType<Array<IEventCustomButton>>,
      default: () => ([]),
    },
    isDesktop: {
      type: Boolean,
      default: false,
    },
    isMaximized: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['paidQuestionClick'],
  setup(props, {emit}) {
    const onCustomButtonClick = (btn: IEventCustomButton) => {
      if (btn.type === 'paidQuestion') {
        const donateConfig: IDonateConfig = {
          price: btn.price || null,
          title: btn.name || null,
          actionText: btn.actionText ? String(btn.actionText) : null,
          commentInputPlaceholder: btn.commentInputPlaceholder || null,
          donationText: btn.donationText || null,
          textarea: btn.textarea !== false, // true by default
          private: btn.private === true, // false by default
        };

        emit('paidQuestionClick', donateConfig);
      } else {
        logError(`Unknown button type: ${String(btn.type)}`);
      }
    }

    return {
      onCustomButtonClick,
      // onDonateClick
    }
  },
})
</script>
