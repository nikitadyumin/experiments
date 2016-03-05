import $ from 'jquery';
import Bacon from 'baconjs';
import bj from 'bacon.jquery';
import html from './index.tpl!'
import Hammer from 'hammerjs';
import render from '../../playground/render';

render(html);
const hammerStream = (element, event) => {
    return Bacon.fromBinder((sink) => {
        const push = () => {
            sink('hammer time!')
        };
        Hammer(element).on(event, push);
        return () => {
            Hammer(element).off(event, push);
        }
    })
};

$(() => {
        const box = document.getElementById('hammer');

        const tap = hammerStream(box, 'tap');

        tap.take(2).onValue(() => {
            $(box).addClass('tapped')
        });

        tap.delay(500).onValue(() => {
            $(box).removeClass('tapped');
        });
        tap.skip(2).take(1).onValue(() => {
            $(box).text('can\'t touch this');
        });
});