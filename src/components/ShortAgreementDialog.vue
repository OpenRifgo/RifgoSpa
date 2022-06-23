<template>
  <q-card-section>
    <q-icon tag="div" size="60px" name="check_circle" class="agreement-icon"></q-icon>
    <p>
      Please view, print or save the documents linked below. <br>
    </p>
    <p>
      For more information on the main characteristics of the Rifgo service, please read our
      Terms of Service
    </p>
    <div style="display: flex">
      <div >
        <input type="checkbox" id="myAgree" name="myAgree"
               style="margin-top: 3px; margin-right: 4px" v-model="hasAgree">
      </div>
      <label for="myAgree">
        By clicking Agree and Continue, I hereby:
      </label>
    </div>
    <ul style="padding-left: 24px;">
      <li>
        Agree and consent to the
        <span class="a-tag" @click="$emit('openTerms')">Terms of Service</span>
        and the <span class="a-tag" @click="$emit('openPolicy')">Privacy Policy</span>
      </li>
      <li>
        Expressly instruct Rifgo to communicate specific information about me and my account to third parties in
        accordance with the Privacy Policy.
      </li>
      <li>
        Specifically and expressly consent to the use of website tracking methods, including cookies,
        and to the safe and secure transmission of your personal information
        outside the European Economic Area in accordance with the Privacy Policy.
      </li>
    </ul>

    <b>User Agreement and Privacy Policy</b>
    <p>
      These documents are designed to inform you of your rights and obligations when using the Rifgo service
    </p>

  </q-card-section>
  <q-card-actions>
    <!--          <q-btn no-caps label="Cancel" @click="onCancelClick"-->
    <!--                 style="margin-left: 16px; color: #4D4D4D" flat-->
    <!--          />-->
    <q-btn color="primary" no-caps @click="$emit('click')"
           :disable="!hasAgree"
           style="width: 500px; padding: 12px 24px; border-radius: 6px; margin: 0 auto 16px"
    >
      <q-icon
        size="17px"
        name="done"
        color="white"
        style="margin-left: 3px"
      />
      <span style="margin-left: 7px;">Agree and Continue</span>
    </q-btn>
  </q-card-actions>
</template>

<script lang="ts">
import {ref} from 'vue';

export default {
  name: 'ShortAgreementDialog',
  emits: ['openTerms', 'openPolicy'],
  setup() {
    const hasAgree = ref(false)

    return {
      hasAgree
    }
  }
}
</script>

<style lang="scss">

.short-agreement-modal {
  width: 550px;
  border: 0.5px solid #E5E5E5;
  border-radius: 12px !important;

  .agreement-icon {
    //background-color: #FF453A;
    color: #639f41;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin: 40px auto 24px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .a-tag {
    color: rgb(0, 0, 238);
    cursor: pointer;
    text-decoration: underline;
  }
}

</style>
