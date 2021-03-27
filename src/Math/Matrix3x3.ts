export default class M3x3 {
  public matrix: number[];

  public static M00 = 0;
  public static M01 = 1;
  public static M02 = 2;
  public static M10 = 3;
  public static M11 = 4;
  public static M12 = 5;
  public static M20 = 6;
  public static M21 = 7;
  public static M22 = 8;

  public constructor() {
    this.matrix = [
      1, 0, 0,
			0, 1, 0,
			0, 0, 1
    ];
  }

  public multiply(m: M3x3): M3x3 {
    var out = new M3x3();

    out.matrix = [
			this.matrix[M3x3.M00] * m.matrix[M3x3.M00] + this.matrix[M3x3.M10] * m.matrix[M3x3.M01] + this.matrix[M3x3.M20] * m.matrix[M3x3.M02],
			this.matrix[M3x3.M01] * m.matrix[M3x3.M00] + this.matrix[M3x3.M11] * m.matrix[M3x3.M01] + this.matrix[M3x3.M21] * m.matrix[M3x3.M02],
			this.matrix[M3x3.M02] * m.matrix[M3x3.M00] + this.matrix[M3x3.M12] * m.matrix[M3x3.M01] + this.matrix[M3x3.M22] * m.matrix[M3x3.M02],
			
			this.matrix[M3x3.M00] * m.matrix[M3x3.M10] + this.matrix[M3x3.M10] * m.matrix[M3x3.M11] + this.matrix[M3x3.M20] * m.matrix[M3x3.M12],
			this.matrix[M3x3.M01] * m.matrix[M3x3.M10] + this.matrix[M3x3.M11] * m.matrix[M3x3.M11] + this.matrix[M3x3.M21] * m.matrix[M3x3.M12],
			this.matrix[M3x3.M02] * m.matrix[M3x3.M10] + this.matrix[M3x3.M12] * m.matrix[M3x3.M11] + this.matrix[M3x3.M22] * m.matrix[M3x3.M12],
			
			this.matrix[M3x3.M00] * m.matrix[M3x3.M20] + this.matrix[M3x3.M10] * m.matrix[M3x3.M21] + this.matrix[M3x3.M20] * m.matrix[M3x3.M22],
			this.matrix[M3x3.M01] * m.matrix[M3x3.M20] + this.matrix[M3x3.M11] * m.matrix[M3x3.M21] + this.matrix[M3x3.M21] * m.matrix[M3x3.M22],
			this.matrix[M3x3.M02] * m.matrix[M3x3.M20] + this.matrix[M3x3.M12] * m.matrix[M3x3.M21] + this.matrix[M3x3.M22] * m.matrix[M3x3.M22]
    ];
    return out;
  }

  public transition(x: number, y: number) {
		var out = new M3x3();
		out.matrix = [
			this.matrix[M3x3.M00],
			this.matrix[M3x3.M01],
			this.matrix[M3x3.M02],
			
			this.matrix[M3x3.M10],
			this.matrix[M3x3.M11],
			this.matrix[M3x3.M12],
			
			x * this.matrix[M3x3.M00] + y * this.matrix[M3x3.M10] + this.matrix[M3x3.M20],
			x * this.matrix[M3x3.M01] + y * this.matrix[M3x3.M11] + this.matrix[M3x3.M21],
			x * this.matrix[M3x3.M02] + y * this.matrix[M3x3.M12] + this.matrix[M3x3.M22]
		];
		return out;
  }
  
  public scale(x: number, y: number) {
		var output = new M3x3();
		output.matrix = [
			this.matrix[M3x3.M00] * x,
			this.matrix[M3x3.M01] * x,
			this.matrix[M3x3.M02] * x,
			
			this.matrix[M3x3.M10] * y,
			this.matrix[M3x3.M11] * y,
			this.matrix[M3x3.M12] * y,
			
			this.matrix[M3x3.M20],
			this.matrix[M3x3.M21],
			this.matrix[M3x3.M22]
		];
		return output;
  }
  
  public getFloatArray() {
		return new Float32Array(this.matrix);
	}
}
