import {computed, Ref} from 'vue';

/**
 * To prevent reloading on resize video is positioned programmatically, so the same element is always used.
 */

export const useVideoPosition = (opts: {
  currentComponent: Ref<string | null>,
  screen: {height: number, width: number},
  isRightWidgetShown: Ref<boolean>,
}) => {
  const videoPositionDefaults = {
    left: 0,
    top: 0,
    position: 'fixed',
    'z-index': 5000,
  }

  const verticalMobileVideoPosition = () => {
    return {
      ...videoPositionDefaults,
      top: '32px',
      height: 'calc(100vw / 16 * 9)',
      width: '100vw',
    }
  }

  const horizontalMaximizedVideoPosition = () => {
    return {
      ...videoPositionDefaults,
      height: '100vh',
      width: '100vw',
    }
  }

  const horizontalMobileVideoPosition = () => {
    return {
      ...videoPositionDefaults,
      left: 0,
      top: 0,
      bottom: '80px',
      'align-items': 'center',
      display: 'flex',
      width: '50vw',
    }
  }

  const desktopVideoPosition = () => {
    return {
      ...videoPositionDefaults,
      top: '32px',
      height: 'calc(100vh - 80px - 32px)',
      width: '70vw',
    }
  }

  const desktopNoChatVideoPosition = () => {
    return {
      ...videoPositionDefaults,
      top: '32px',
      height: 'calc(100vh - 80px - 32px)',
      width: '100vw',
    }
  }

  const videoPosition = computed(() => {
    if (opts.currentComponent.value === 'event-template-vertical-mobile') return verticalMobileVideoPosition();
    if (opts.currentComponent.value === 'event-template-horizontal-mobile') return horizontalMobileVideoPosition();
    if (opts.currentComponent.value === 'event-template-horizontal-maximized') return horizontalMaximizedVideoPosition();
    if (opts.currentComponent.value === 'event-template-desktop') {
      return opts.isRightWidgetShown.value ? desktopVideoPosition() : desktopNoChatVideoPosition();
    }

    return desktopVideoPosition();
  });

  return videoPosition
}
