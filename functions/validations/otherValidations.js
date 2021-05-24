// 4 - Crie o endpoint POST /talker
// Os seguintes pontos serão avaliados:
// O endpoint deve ser capaz de adicionar uma nova pessoa palestrante ao seu arquivo;

// O corpo da requisição deverá ter o seguinte formato:

// {
//   "name": "Danielle Santos",
//   "age": 56,
//   "talk": {
//     "watchedAt": "22/10/2019",
//     "rate": 5
//   }
// }
// A requisição deve ter o token de autenticação nos headers.

// Caso o token não seja encontrado retorne um código de status 401, com o seguinte corpo:

// {
//   "message": "Token não encontrado"
// }
// Caso o token seja inválido retorne um código de status 401, com o seguinte corpo:

// {
//   "message": "Token inválido"
// }
// O campo name deverá ter no mínimo 3 caracteres. Ele é obrigatório.

// Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo:

// {
//   "message": "O campo \"name\" é obrigatório"
// }
// Caso o nome não tenha pelo menos 3 caracteres retorne um código de status 400, com o seguinte corpo:

// {
//   "message": "O \"name\" deve ter pelo menos 3 caracteres"
// }
// O campo age deverá ser um inteiro e apenas pessoas maiores de idade (pelo menos 18 anos) podem ser cadastrados. Ele é obrigatório.

// Caso o campo não seja passado ou esteja vazio retorne um código de status 400, com o seguinte corpo:

// {
//   "message": "O campo \"age\" é obrigatório"
// }
// Caso a pessoa palestrante não tenha pelo menos 18 anos retorne status 400, com o seguinte corpo:

// {
//   "message": "A pessoa palestrante deve ser maior de idade"
// }
// O campo talk deverá ser um objeto com as seguintes chaves:

// A chave watchedAt deve ser uma data no formato dd/mm/aaaa.

// Caso a data não respeito o formato dd/mm/aaaa retorne status 400, com o seguinte corpo:
// {
//   "message": "O campo \"watchedAt\" deve ter o formato \"dd/mm/aaaa\""
// }
// A chave rate deve ser um inteiro de 1 à 5.

// Caso a nota não seja um inteiro de 1 à 5 retorne status 400, com o seguinte corpo:

// {
//   "message": "O campo \"rate\" deve ser um inteiro de 1 à 5"
// }
// O campo talk é obrigatório e nenhuma das chaves citadas anteriormente podem ser vazias.

// Caso o campo não seja informado, esteja vazio ou então alguma de suas chaves não tenham sido informadas retorne status 400, com o seguinte corpo:

// {
//   "message": "O campo \"talk\" é obrigatório e \"watchedAt\" e \"rate\" não podem ser vazios"
// }
// Caso esteja tudo certo, retorne o status 201 e a pessoa cadastrada.

// O endpoint deve retornar o status 201 e a pessoa palestrante que foi cadastrada, da seguinte forma:

// {
//   "id": 1,
//   "name": "Danielle Santos",
//   "age": 56,
//   "talk": {
//     "watchedAt": "22/10/2019",
//     "rate": 5
//   }
// }
