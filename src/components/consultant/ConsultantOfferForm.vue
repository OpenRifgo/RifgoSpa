<template>
  <q-input
    placeholder="Title *"
    outlined
    v-model="offer.title"
    hint="Example: 1-hour coaching session"
    class="offer-field"
  />

<!--  <q-input-->
<!--    placeholder="Subtitle *"-->
<!--    outlined-->
<!--    v-model="offer.subtitle"-->
<!--    hint="Example: Toni Stark"-->
<!--    class="offer-field"-->
<!--  />-->

  <q-editor
    :placeholder="placeholderDescription"
    :toolbar="[
              ['bold', 'italic']
            ]"
    @focus="hidePlaceholder"
    outlined
    v-model="offer.description"
  />
  <p class="editor-description-label">
    Example: Start meeting for make a connection and understand your request.
  </p>

  <q-input
    placeholder="Price *"
    outlined
    v-model="offer.price"
    type="number"
    prefix="$"
    hint="Example: Toni Stark"
    class="offer-field"
  />
  <q-toggle v-model="offer.isEnabled"
            class="offer-field"
            :label="offer.isEnabled ? 'Offer Enabled' : 'Offer Disabled'"
  />

  <q-select
    placeholder="Calendar Event Type *"
    :options="calendlyEventTypes"
    outlined
    emit-value
    map-options
    v-model="offer.calendlyEventType"
    :loading="calendlyEventTypesLoading"
    hint="Example: Toni Stark"
    class="offer-calendly-field"
  />

</template>

<style lang="scss">
.auth_tabs .q-tab__label {
  color: #1D1D1D;
}

.offer-field .q-field__bottom,
.offer-calendly-field .q-field__bottom,
.editor-description-label {
  padding: 8px 16px 0;
  font-style: italic;
  color: #C3C3C3;
  font-size: 12px;
  line-height: 20px;
}

.offer-field {
  margin-bottom: 16px;
}

.q-field--outlined.q-field--readonly .q-field__control:before {
  border-style: solid;
}

.q-field--outlined .q-field__control {
  border-radius: 8px;
  padding: 0 12px 0 16px;
}

.q-field__before, .q-field__prepend {
  padding-right: 0;
}

.q-field__control {
  height: 48px;
}

.q-field__marginal {
  height: 48px;
  color: #333333;
}

.q-field__focusable-action {
  opacity: 1;
}

.q-field--auto-height .q-field__control, .q-field--auto-height .q-field__native {
  min-height: 48px;
}

</style>

<script lang="ts">
import {computed, defineComponent, onMounted, PropType, ref} from 'vue';

import {IConsultantOfferEdit} from 'src/models/ConsultantInterfaces'
import {getCalendlyEventTypes} from 'src/api/consultantRequests'

export default defineComponent({
  components: {},
  props: {
    modelValue: {
      type: Object as PropType<IConsultantOfferEdit>,
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {
    const calendlyEventTypes = ref<{ value: string, label: string }[]>([]);
    const calendlyEventTypesLoading = ref(true);

    onMounted(async () => {
      calendlyEventTypesLoading.value = true;

      const calendlyEventTypesData = await getCalendlyEventTypes();
      calendlyEventTypes.value = calendlyEventTypesData
        .map(val => ({
          value: val.uri,
          label: [val.name, val.description_plain].filter(v => v).join(' ')
        }));

      calendlyEventTypesLoading.value = false;

      if (offer.value && !offer.value.description) offer.value.description = placeholderDescription.value
    });

    const offer = computed({
      get: () => props.modelValue,
      set: (newValue) => emit('update:modelValue', newValue)
    });

    const placeholderDescription = ref('Description *')
    const hidePlaceholder = () => {
      if (offer.value && offer.value.description === placeholderDescription.value) {
        console.log(offer.value.description)
        console.log(placeholderDescription.value)
        offer.value.description = ''
      }
    }
    const togglePlaceholder = () => {
      if (offer.value && !offer.value.description) {
        offer.value.description = placeholderDescription.value
      }
    }

    return {
      offer,
      calendlyEventTypes,
      calendlyEventTypesLoading,

      hidePlaceholder,
      togglePlaceholder,
      placeholderDescription,

    };
  },
});
</script>
