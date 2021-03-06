import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { Usuario } from "../../models/classes/Usuario";
import { MensagemEnum } from "../../models/enums/MensagemEnum";
import { AlertaService } from "../../servicos/alerta.service";
import { UsuarioService } from "../../servicos/usuario.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.scss"],
})
export class CadastroComponent implements OnInit {
  public form: FormGroup;
  public dataMaxima: string;
  public dataMinima: string;
  public msgErro: String;
  public exibeSenha: Boolean = false;
  public tipoInput: String = "password";
  public classeIcone: String = "pi  pi-eye-slash";

  constructor(
    private _usuarioService: UsuarioService,
    private _alerta: AlertaService,
    private _builder: FormBuilder,
    private _ref: DynamicDialogRef
  ) {
    this.setForm();
  }

  ngOnInit(): void {}

  public setForm() {
    // this.recuperarDatas();
    this.form = this._builder.group({
      email: [
        { value: null, disabled: false },
        [Validators.minLength(5), Validators.email, Validators.required],
      ],
      senha: [
        { value: null, disabled: false },
        [Validators.minLength(8), Validators.required],
      ],
      confirmarSenha: [
        { value: null, disabled: false },
        [Validators.minLength(8), Validators.required],
      ],
    });
  }

  // public recuperarDatas() {
  //   const dataRef: Date = new Date();

  //   const dataMin: Date = DataUtilsConstants.subtract(dataRef, 100, "years");
  //   this.dataMaxima = DataUtilsConstants.dataConvertDateToString(
  //     dataRef,
  //     "YYYY-MM-DD"
  //   );
  //   this.dataMinima = DataUtilsConstants.dataConvertDateToString(
  //     dataMin,
  //     "YYYY-MM-DD"
  //   );
  // }

  public mostrarSenha() {
    if (this.exibeSenha) {
      this.tipoInput = "text";
      this.classeIcone = "pi pi-eye";
    } else {
      this.tipoInput = "password";
      this.classeIcone = "pi pi-eye-slash";
    }
    this.exibeSenha = !this.exibeSenha;
  }

  public validarSenhas() {
    if (
      this.form.controls.confirmarSenha.valid &&
      this.form.controls.senha.valid
    ) {
      if (
        this.form.controls.confirmarSenha.value !=
        this.form.controls.senha.value
      ) {
        this.msgErro = MensagemEnum.SENHAS_DIFEREM;
      } else {
        this.msgErro = "";
      }
    } else {
      this.msgErro = MensagemEnum.SENHA_INVALIDA;
    }
  }

  public cadastrar() {
    if (this.form.valid) {
      const usuario: Usuario = new Usuario();
      usuario.email = this.form.controls.email.value;
      usuario.senha = this.form.controls.senha.value;

      if (
        this.form.controls.confirmarSenha.value ==
        this.form.controls.senha.value
      ) {
        this._usuarioService.criarUsuario(usuario).subscribe(
          (result) => {
            this._alerta.sucesso(MensagemEnum.CADASTRO_SUCESSO);
            this._ref.close();
          },
          (error) => {
            if (error["message"]?.includes("Duplicate")) {
              this._alerta.erro(MensagemEnum.EMAIL_CADASTRADO);
            }
          }
        );
      }
    } else {
      if (this.form.controls.email.invalid) {
        this.msgErro = MensagemEnum.EMAIL_INVALIDO;
      } else if (this.form.controls.senha.invalid) {
        this.msgErro = MensagemEnum.SENHA_INVALIDA;
      } else {
        this.msgErro = MensagemEnum.PREENCHA_TODOS_CAMPOS;
      }
    }
  }
}
