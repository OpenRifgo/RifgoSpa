import {IEventCustomButton, IPublicEventSettings} from 'src/models/EventModels'
import {computed, Ref} from 'vue'
import {valOrDefault} from 'src/lib/coerce'

const DEFAULT_BUTTON_COLOR = '#615DFF';

function useCustomButtons(buttons: Array<IEventCustomButton> | undefined): Array<IEventCustomButton> {
  return (buttons || []).map(btn => {
      if (btn.type === 'paidQuestion') {
        return {
          ...btn,
          name: String(btn?.name || ''),
          smLabel: btn?.smLabel || '',
          color: btn.color || DEFAULT_BUTTON_COLOR,
        }
      } else if (btn.type === 'link') {
        return {
          ...btn,
          name: String(btn?.name),
          color: btn.color || DEFAULT_BUTTON_COLOR,
        }
      } else if (btn.type === 'image') {
        return {
          ...btn
        }
      } else {
        return btn;
      }
    }
  );
}

export default function (eventSettings: Ref<IPublicEventSettings | undefined>) {
  const myLinks = computed(() => ({
    enabled: valOrDefault(eventSettings.value?.myLinks?.enabled, true),
    text: valOrDefault(eventSettings.value?.myLinks?.text, 'My links'),
  }));

  const leftTop = useCustomButtons(eventSettings.value?.leftTop);
  const leftBottom = useCustomButtons(eventSettings.value?.leftBottom);
  const overlayLeftBottom = useCustomButtons(eventSettings.value?.overlayLeftBottom);

  return {
    raw: eventSettings,
    myLinks,
    leftTop,
    leftBottom,
    overlayLeftBottom,
  }
}
