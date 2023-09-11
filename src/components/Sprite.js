/*
 * If not stated otherwise in this file or this component's LICENSE file the
 * following copyright and licenses apply:
 *
 * Copyright 2023 Comcast
 *
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Component from '../component.js'

export default () =>
  Component('Sprite', {
    template: `
      <Element w="$w" h="$h" :texture="$texture" />
    `,
    props: ['image', 'map', 'frame', 'w', 'h'],
    state() {
      return {
        spriteTexture: false,
      }
    },
    computed: {
      texture() {
        const options =
          'frames' in this.map
            ? { ...(this.map.defaults || {}), ...this.map.frames[this.frame] }
            : this.map[this.frame]

        if (this.spriteTexture && options) {
          return this.___renderer.makeTexture('SubTexture', {
            texture: this.spriteTexture,
            x: options.x,
            y: options.y,
            width: options.w,
            height: options.h,
          })
        }
      },
    },
    hooks: {
      ready() {
        this.spriteTexture = this.___renderer.makeTexture('ImageTexture', {
          src: `${window.location.protocol}//${window.location.host}/${this.image}`,
        })
      },
    },
  })
