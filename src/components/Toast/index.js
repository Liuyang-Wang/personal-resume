import Vue from 'vue';
import style from './index.module.scss';

const toast = {
  name: 'Toast',
  props: {
    message: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      show: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const isHaveEl = window.document.querySelectorAll(`.${style.toast}`);
      if (isHaveEl.length) {
        /**
        * todo 点击之后模仿bilibil的toast向上移动
        */
        for (let index = 0; index < isHaveEl.length; index++) {
          const element = isHaveEl[index];
          // matrix(1, 0, 0, 1, -32, 0)
          // const transformValue = window.getComputedStyle(element, null).getPropertyValue('transform');
          // const [, params] = transformValue.match(/matrix\((.*?)\)/) || Array(2).fill('');
          // console.log(params.split(',').at(-2).trim());
          element.style.transform = `translateY(calc(-${isHaveEl.length - index}00% - ${isHaveEl.length - index}0px))`;
        }
      }

      this.show = true;
      if (this.duration) {
        setTimeout(() => {
          this.show = false;
          this.$emit('onClose');
        }, this.duration);
      }
    },
    afterLeave() {
      this.$emit('onAfterLeave');
    }
  },
  render() {
    return (
      <div class={style.wrapper}>
        <transition name='show' onAfterLeave={this.afterLeave}>
          {
            this.show ? <div class={style.toast} >
              { this.message }
            </div> : ''
          }
        </transition>
      </div>
    );
  }
};

function showToast(props) {
  return new Promise(resolve => {
    if (props.constructor === String) {
      props = {
        message: props
      };
    } else if (props.constructor !== Object) {
      throw TypeError('props must be of type String or Object ');
    }
    const app = new Vue({
      render: h =>
        h(toast, {
          props,
          on: {
            onClose: () => {
              resolve();
            },
            onAfterLeave() {
              window.document.body.removeChild(app.$el);
              app.$destroy();
            }
          }
        })
    }).$mount();
    window.document.body.append(app.$el);
  });
}

export default showToast;
