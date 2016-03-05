import $ from 'jquery';
import Bacon from 'baconjs';
import bj from 'bacon.jquery';
import html from './index.tpl!';
import render from '../../playground/render';

render(html);
$(() => {
    const key = $(document).asEventStream('keydown');
    key.map(1).scan(0, (a, b) => a + b).assign($('#result'),'text');
});
