import { trigger, state, style, transition, animate, animateChild, query } from '@angular/animations';


export const onSideNavChange = trigger('onSideNavChange', [
    state('close',
        style({
            'min-width': '50px'
        })
    ),
    state('open',
        style({
            'min-width': '200px'
        })
    ),
    transition('close => open', animate('250ms ease-in')),
    transition('open => close', animate('250ms ease-in')),
]);


export const onMainContentChange = trigger('onMainContentChange', [
    state('0',
        style({
            'margin-left': '62px'
        })
    ),
    state('1',
        style({
            'margin-left': '0px'
        })
    ),
    state('2',
        style({
            'margin-left': '230px'
        })
    ),
    transition('0 => 2', animate('250ms ease-in')),
    transition('1 => 2', animate('250ms ease-in')),
    transition('2 => 1', animate('250ms ease-in')),
    transition('2 => 0', animate('250ms ease-in')),
]);


export const animateText = trigger('animateText', [
    state('hide',
        style({
            display: 'none',
            opacity: 0,
        })
    ),
    state('show',
        style({
            display: 'block',
            opacity: 1,
        })
    ),
    transition('close => open', animate('350ms ease-in')),
    transition('open => close', animate('200ms ease-out')),
]);
