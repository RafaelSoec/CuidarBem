export const UtilsConstante = {
  gerarNovaSenha(numCaracteres: number) {
    let pass = "";
    for (var i = 0; i < numCaracteres; i++) {
      pass += this.gerarCaracter();
    }
    return pass;
  },

  gerarCaracter() {
    /*
     *    matriz contendo em cada linha indices (inicial e final) da tabela ASCII para retornar alguns caracteres.
     *    [48, 57] = numeros;
     *    [64, 90] = "@" mais letras maiusculas;
     *    [97, 122] = letras minusculas;
     */
    var ascii = [
      [48, 57],
      [64, 90],
      [97, 122],
    ];
    var i = Math.floor(Math.random() * ascii.length);
    return String.fromCharCode(
      Math.floor(Math.random() * (ascii[i][1] - ascii[i][0])) + ascii[i][0]
    );
  },
};
