import { VNode, VProps } from 'million';
import { h, JSXVNode } from 'million/jsx-runtime';

export const elementFactory = (
  tagName: string,
  defaultProps: VProps = {},
  defaultChildren: JSXVNode[] = [],
) => {
  function vnode1(props: VProps): VNode;
  function vnode1(...children: JSXVNode[]): VNode;
  function vnode1(...propsOrChildren: any): VNode | ((...children: JSXVNode[]) => VNode) {
    if (
      !propsOrChildren[0]?.flag &&
      !propsOrChildren[0]?.data &&
      typeof propsOrChildren[0] === 'object'
    ) {
      function vnode2(...children: JSXVNode[]): VNode;
      function vnode2(...children: JSXVNode[]): VNode {
        return h(
          tagName,
          { ...propsOrChildren[0], ...defaultProps },
          ...defaultChildren,
          ...children,
        );
      }
      return vnode2;
    } else {
      return h(tagName, defaultProps, ...defaultChildren, ...propsOrChildren);
    }
  }
  return vnode1;
};

export const key = (key: string, props: VProps): VProps => {
  props.key = key;
  return props;
};

export const input = elementFactory('input');
export const textarea = elementFactory('textarea');
export const checkbox = elementFactory('input');
export const address = elementFactory('address');
export const article = elementFactory('article');
export const aside = elementFactory('aside');
export const footer = elementFactory('footer');
export const header = elementFactory('header');
export const h1 = elementFactory('h1');
export const h2 = elementFactory('h2');
export const h3 = elementFactory('h3');
export const h4 = elementFactory('h4');
export const h5 = elementFactory('h5');
export const h6 = elementFactory('h6');
export const hgroup = elementFactory('hgroup');
export const nav = elementFactory('nav');
export const section = elementFactory('section');
export const blockquote = elementFactory('blockquote');
export const dd = elementFactory('dd');
export const div = elementFactory('div');
export const dl = elementFactory('dl');
export const dt = elementFactory('dt');
export const figcaption = elementFactory('figcaption');
export const figure = elementFactory('figure');
export const hr = elementFactory('hr');
export const li = elementFactory('li');
export const main = elementFactory('main');
export const ol = elementFactory('ol');
export const p = elementFactory('p');
export const pre = elementFactory('pre');
export const ul = elementFactory('ul');
export const a = elementFactory('a');
export const abbr = elementFactory('abbr');
export const b = elementFactory('b');
export const bdi = elementFactory('bdi');
export const bdo = elementFactory('bdo');
export const br = elementFactory('br');
export const cite = elementFactory('cite');
export const code = elementFactory('code');
export const data = elementFactory('data');
export const dfn = elementFactory('dfn');
export const em = elementFactory('em');
export const i = elementFactory('i');
export const kbd = elementFactory('kbd');
export const mark = elementFactory('mark');
export const q = elementFactory('q');
export const rp = elementFactory('rp');
export const rt = elementFactory('rt');
export const rtc = elementFactory('rtc');
export const ruby = elementFactory('ruby');
export const s = elementFactory('s');
export const samp = elementFactory('samp');
export const small = elementFactory('small');
export const span = elementFactory('span');
export const strong = elementFactory('strong');
export const sub = elementFactory('sub');
export const sup = elementFactory('sup');
export const time = elementFactory('time');
export const u = elementFactory('u');
export const varElement = elementFactory('var');
export const wbr = elementFactory('wbr');
export const area = elementFactory('area');
export const audio = elementFactory('audio');
export const img = elementFactory('img');
export const map = elementFactory('map');
export const track = elementFactory('track');
export const video = elementFactory('video');
export const embed = elementFactory('embed');
export const object = elementFactory('object');
export const param = elementFactory('param');
export const picture = elementFactory('picture');
export const source = elementFactory('source');
export const canvas = elementFactory('canvas');
export const script = elementFactory('script');
export const del = elementFactory('del');
export const ins = elementFactory('ins');
export const caption = elementFactory('caption');
export const col = elementFactory('col');
export const colgroup = elementFactory('colgroup');
export const table = elementFactory('table');
export const tbody = elementFactory('tbody');
export const td = elementFactory('td');
export const tfoot = elementFactory('tfoot');
export const th = elementFactory('th');
export const thead = elementFactory('thead');
export const tr = elementFactory('tr');
export const button = elementFactory('button');
export const datalist = elementFactory('datalist');
export const fieldset = elementFactory('fieldset');
export const form = elementFactory('form');
export const label = elementFactory('label');
export const legend = elementFactory('legend');
export const meter = elementFactory('meter');
export const optgroup = elementFactory('optgroup');
export const option = elementFactory('option');
export const output = elementFactory('output');
export const progress = elementFactory('progress');
export const select = elementFactory('select');
export const details = elementFactory('details');
export const menuitem = elementFactory('menuitem');
export const summary = elementFactory('summary');
export const slot = elementFactory('slot');
export const template = elementFactory('template');
export const circle = elementFactory('circle');
export const rect = elementFactory('rect');
export const ellipse = elementFactory('ellipse');
export const g = elementFactory('g');
export const image = elementFactory('image');
export const line = elementFactory('line');
export const mask = elementFactory('mask');
export const path = elementFactory('path');
export const polygon = elementFactory('polygon');
export const polyline = elementFactory('polyline');
export const svg = elementFactory('svg');
export const svgText = elementFactory('text');
export const marker = elementFactory('marker');
export const linearGradient = elementFactory('linearGradient');
export const foreignObject = elementFactory('foreignObject');
