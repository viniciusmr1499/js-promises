function obterUsuario() {
  return new Promise(function resolveUsuario(resolve, reject) {
    setTimeout(() => {
      return resolve({
        id: 1,
        nome: 'Vinicius',
        idade: 22
      })
    }, 2000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolveObterTelefone(resolve, reject) {
    setTimeout(() => {
      return resolve({
        ddd: 085,
        numero: 98985654848
      })
    }, 2000)
  })
}

function obterEndereco(idUsuario) {
  return new Promise(function resolveObterEndereco(resolve, reject) {
    setTimeout(() => {
      return resolve({
        rua: 'dos bobos',
        bairro: 'gentilandia',
        numero: 849
      })
    }, 2000)
  })
}

const usuarioPromise = obterUsuario()

usuarioPromise
  .then(usuario => {
    return obterTelefone()
      .then(telefone => {
        return {
          usuario: {
            id: usuario.id,
            nome: usuario.nome,
          },
          telefone
        }
      })
  })
  .then(resultado => {
    return obterEndereco(resultado.usuario.id)
      .then(endereco => {
        return {
          usuario: resultado.usuario,
          telefone: resultado.telefone,
          endereco
        }
      })
  })
  .then(resultado => console.log(`
    Nome: ${resultado.usuario.nome}
    Endereço: rua ${resultado.endereco.rua}, ${resultado.endereco.numero}
    Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.numero}
  `))
  .catch(error => console.log('DEU RUIM', error))