import { gsap } from "gsap";

export const fadeOut = (component, time, callback) => {
	time /= 1000;

	const tl = gsap.timeline({
		defaults: { duration: time },
	});

	tl.to(component, { opacity: 0 });

	tl.eventCallback("onComplete", callback);
};
