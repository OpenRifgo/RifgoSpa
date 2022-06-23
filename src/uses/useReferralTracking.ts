import {useStorage} from '@vueuse/core'

interface IReferralTrackingRecord {
  uid: string
}

export const useReferralTracking = () => {
  const storage = useStorage<Record<string, Array<IReferralTrackingRecord>>>('referral', {});

  const addReferral = (consultantSlug: string, referralUid: string) => {
    if (!storage.value[consultantSlug]) {
      storage.value[consultantSlug] = [];
    }

    storage.value[consultantSlug].push({uid: referralUid});
  }

  const getReferral = (consultantSlug: string) => {
    return (storage.value[consultantSlug] || [])[0]; // return first referral
  }

  return {
    storage,
    addReferral,
    getReferral,
  };
}
