<template>

  <main class="consultant_peer_wrapper">

    <div
      class="text-left"
    >
      <q-btn
        type="a"
        :to="consultantPageRoute"
        dense round flat
        icon="fas fa-arrow-left"
        class="q-my-sm"
      />
    </div>

    <q-card
      class="consultant_my_session q-mb-md"
      flat
      v-for="(peer, peerIdx) in peers"
      v-bind:key="peerIdx"
    >
      <q-card-section>
        <router-link
          :to="getConsultantPageRoute(peer.peerConsultant.slug)"
          target="_blank"
          class="text-center"
        >

          <div class="avatar_wrapper">
            <q-avatar size="48px">
              <q-img
                :src="peer.peerConsultant.avatarUrl ? `/static/uploads/${peer.peerConsultant.avatarUrl}` : '/preview/avatar_placeholder.svg'"
                :ratio="1"
                fit="cover"
              />
            </q-avatar>
          </div>

          <h3>
            {{ peer.peerConsultant.name }}
          </h3>
        </router-link>

        <p class="consultant_title text-center">{{ peer.peerConsultant.title }}</p>

        <p
          class="consultant_peer_description"
          v-html="peer.text"
        />
      </q-card-section>
    </q-card>

  </main>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {getConsultantPeers} from 'src/api/publicRequests';
import {IConsultantPeer} from 'src/models/ConsultantInterfaces'
import {getConsultantPageRoute, useConsultantRoute} from 'src/uses/useConsultant'

export default defineComponent({
  setup() {
    const $consultant = useConsultantRoute();

    const peers = ref<Array<IConsultantPeer>>([]);

    onMounted(async () => {
      peers.value = await getConsultantPeers($consultant.slug.value);
    });

    return {
      peers,
      getConsultantPageRoute,
      ...$consultant,
    }
  },
});
</script>

<style lang="scss" scoped>
main.consultant_peer_wrapper {
  padding: 0 17px;
  width: 375px;
  margin: 0 auto;
  text-align: center;
  color: #333333;
  line-height: 20px;
  letter-spacing: 0.3px;
  font-weight: 400;

  div.avatar_wrapper {
    display: flex;

    > div {
      margin: 0 auto 0;
    }
  }

  h1 {
    font-size: 18px;
    font-weight: 800;
    margin: 13px 0 0;
    line-height: 20px;
    letter-spacing: 0.3px;
  }

  a, a:visited, a:hover {
    color: inherit;
  }

  p.consultant_title {
    margin: 5px 0 24px;
    font-size: 16px;
  }

  p.consultant_description {
    line-height: 24px;
    font-size: 16px;
    margin-bottom: 24px;
  }

  div.consultant_recommended_me {
    border: 1px solid #EBEBEB;
    border-radius: 12px;
    padding: 24px 24px 38px;
    margin-bottom: 32px;

    div.q-card__section {
      padding: 0;

      h3 {
        margin: 0 0 15px;
        line-height: 24px;
        font-size: 24px;
        letter-spacing: 0.3px;
        font-weight: 700
      }

      p.consultant_recommended--promo_text {
        color: #666666;
        letter-spacing: -0.4px;
        font-size: 14px;
        margin-bottom: 24px;
      }

      button {
        width: 100%;
        border-radius: 6px;

        span {
          color: #615DFF;
        }
      }
    }
  }

  h2.consultant_my_session_title {
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.3px;
    line-height: 20px;

    margin: 0 0 13px;
    text-align: left;
  }

  div.consultant_my_session {

    text-align: left;
    padding: 24px;
    border: 1px solid #EBEBEB;
    border-radius: 12px;

    div.q-card__section {
      padding: 0;

      span {
        color: #9C9C9C;
        line-height: 24px;
        font-weight: 700;
        font-size: 12px;
        text-transform: uppercase;
      }

      h3 {
        margin: 3px 0 11px;
        font-size: 24px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: 0.3px;
      }

      p.consultant_peer_description {
        color: #666666;
        letter-spacing: -0.4px;
        font-size: 14px;
        margin-bottom: 6px;
      }

      button {
        width: 100%;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        border-radius: 6px;

        svg {
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
