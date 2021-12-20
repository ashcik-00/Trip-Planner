import { api } from "./api.js";

const createPlanObjectArray = (data) => {
    const plans = [];
    data.plans.forEach(plan => {
        plans.push({
            segments: plan.segments
        });
    });
    return plans;
};

const getQuickestPlan = (plans) => {
    let minActions = plans[0].segments.length;
    let plan, quickestPlanIndex = 0;
    for (let i = 0; i < plans.length; i++) {
        plan = plans[i];
        if (minActions > plan.segments.length) {
            minActions = plan.segments.length;
            quickestPlanIndex = i;
        }
    }
    return plans[quickestPlanIndex];
}

const renderPlanHTML = (planList) => {
    let html = getActionsHTML(getQuickestPlan(planList));
    const planEl = document.querySelector('.my-trip');
    planEl.insertAdjacentHTML('afterbegin', html);
}

const getActionsHTML = (plan) => {
    let html = '';
    let route;
    plan.segments.forEach(action => {
        let duration = action.times.durations.total;
        switch (action.type) {
            case 'walk':
                if (typeof action.to.stop !== 'undefined') {
                    html += `<li>
                            <i class="fas fa-walking" aria-hidden="true"></i>Walk for ${duration} minutes
                            to stop #${action.to.stop.key} - ${action.to.stop.name}
                            </li>`;
                } else {
                    html += `<li>
                            <i class="fas fa-walking" aria-hidden="true"></i>Walk for ${duration} minutes
                            to your destination.
                            </li>`;
                }
                break;

            case 'ride':
                route = (typeof action.route.name !== 'undefined') ? action.route.name : action.route.number;
                html += `<li>
                        <i class="fas fa-bus" aria-hidden="true"></i>Ride the ${route}
                        for ${duration} minutes.
                     </li>`;
                break;

            case 'transfer':
                html += `<li>
                        <i class="fas fa-ticket-alt" aria-hidden="true"></i>Transfer from stop
                        #${action.from.stop.key} - ${action.from.stop.name} to stop #${action.to.stop.key} - ${action.to.stop.name}
                     </li>`;
            default:
                break;
        }
    });
    return html;
}

export const getPlans = (x, y, X, Y) => {
    fetch(
        `${api.planner.url}?origin=geo/${x},${y}&destination=geo/${X},${Y}&api-key=${api.planner.key}`
    ).then((response) => response.json())
        .then((data) => {
            renderPlanHTML(createPlanObjectArray(data));
        });
};