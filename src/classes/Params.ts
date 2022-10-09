export default class Params {
	public static ActivationResponse: number = 1;
	public static Bias: number = -1;
	public static CrossoverRate: number = 0.7;
	public static DefaultHeaderTextStyle = {
		'fontFamily': 'Trebuchet MS',
		'fontSize': 17,
		'fill': '#ffffff',
		'lineHeight': 19,
		'trim': true,
	};
	public static MaxPerturbation: number = 0.3;
	public static MutationRate: number = 0.1;
	public static NeuronsPerHiddenLayer: number = 6;
	public static NumCopiesElite: number = 1;
	public static NumElite: number = 1;
	public static NumHidden: number = 1;
	public static NumInputs: number = 2;
	public static NumOutputs: number = 4;
	public static Padding: number = 0.05; // Padding of containers in percentage of the width/height
}
