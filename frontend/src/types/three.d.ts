declare module "three/addons/postprocessing/EffectComposer.js" {
	export class EffectComposer {
		constructor(...args: any[]);
		addPass(...args: any[]): void;
		render(...args: any[]): void;
		setSize(...args: any[]): void;
		setPixelRatio(...args: any[]): void;
		dispose?: () => void;
	}
}

declare module "three/addons/postprocessing/RenderPass.js" {
	export class RenderPass {
		constructor(...args: any[]);
	}
}

declare module "three/addons/postprocessing/UnrealBloomPass.js" {
	export class UnrealBloomPass {
		constructor(...args: any[]);
		resolution: { set: (...args: any[]) => void };
		setSize?: (...args: any[]) => void;
		dispose?: () => void;
	}
}

declare module "three/addons/postprocessing/ShaderPass.js" {
	export class ShaderPass {
		constructor(...args: any[]);
		uniforms: Record<string, any>;
		setSize?: (...args: any[]) => void;
		dispose?: () => void;
	}
}
