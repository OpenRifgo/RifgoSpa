<template>
  <main>
    <div class="title-wrapper">
      <h2>{{ stepName[actualStep] }}</h2>
      <span class="actual-step">{{ actualStep+1 + '/ ' + stepLength }}</span>
    </div>
    <section class="public-warning">
      <span>This information will be seen by your customers</span>
    </section>
    <q-input :model-value="consultant.name" outlined></q-input>
    <q-input :model-value="consultant.title" outlined></q-input>
    <q-input :model-value="consultant.description" type="textarea" outlined></q-input>
    <q-input :model-value="consultant.slug" outlined ></q-input>
    <q-input :model-value="consultant.avatarUrl"></q-input>
  </main>
</template>

<script lang="ts">
import {computed, reactive, ref} from 'vue';
import {IConsultant} from 'src/models/ConsultantInterfaces';

export default {
  name: 'Onboarding',
  setup() {
    const stepName = ref(['About you', 'Step 2', 'Step 3', 'Step 4'])
    const actualStep = ref(0)
    const stepLength = computed(() => stepName.value.length)

    const consultant = reactive<Partial<IConsultant>>({})


    return {
      stepName,
      actualStep,
      stepLength,
      consultant
    }
  }
}
</script>

<style scoped lang="scss">
main {
  width: 327px;
  margin: 0 auto;
  color: #333333;

  .title-wrapper {
    display: flex;
    margin-top: 148px;
    justify-content: space-between;

    h2 {
      margin: 0;
      font-weight: 600;
      font-size: 24px;
      line-height: 22px;
    }

    span.actual-step {
      font-weight: 500;
      font-size: 16px;
      line-height: 22px;
      text-align: right;

      color: #979797;
    }

  }

  .public-warning {
    margin: 24px 0;
    background: #FFFDD0;
    border-radius: 8px;
    text-align: center;
    padding: 13.5px 0;

    span {
      font-size: 14px;
      line-height: 18px;

    }
  }
}
</style>
