declare module '@3d-dice/dice-box' {
  export interface DiceBoxOptions {
    assetPath: string;
    container: string;
    id?: string;
    gravity?: number;
    mass?: number;
    friction?: number;
    restitution?: number;
    angularDamping?: number;
    linearDamping?: number;
    spinForce?: number;
    throwForce?: number;
    startingHeight?: number;
    settleTimeout?: number;
    offscreen?: boolean;
    delay?: number;
    lightIntensity?: number;
    enableShadows?: boolean;
    shadowTransparency?: number;
    theme?: string;
    themeColor?: string;
    scale?: number;
    onRollComplete?: (results: any[]) => void;
  }

  class DiceBox {
    constructor(options: DiceBoxOptions);

    init(): Promise<void>;
    roll(diceExpression: string): void;
    clear(): void;
  }

  export default DiceBox;
}
