import express from "express"

export const calculosRouter = express.Router()

let calculos = []
let calculosMaxId = 0

calculosRouter.get("/", (req, res) => {
  res.send({ calculos })
})

calculosRouter.get("/:id", (req, res) => {
  const id = req.params.id
  const calculo = calculos.find((calculo) => calculo.id == id)
  res.send({ calculo })
});

calculosRouter.post("/", (req, res) => {
  const { base, altura } = req.body
  const rectangulo = {
    id: ++calculosMaxId,
    base,
    altura,
    perimetro: (base + altura) * 2,
    area: base * altura,
  }
  calculos.push(rectangulo)
  res.status(201).send({ rectangulo })
})

calculosRouter.put("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const { base, altura } = req.body
  const calculoModificado = {
    id,
    base,
    altura,
    perimetro: (base + altura) * 2,
    area: base * altura,
  }
  calculos = calculos.map((rectangulo) =>
    rectangulo.id === id ? calculoModificado : rectangulo
  )
  res.status(200).send({ rectangulo: calculoModificado })
})

calculosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id)
  calculos = calculos.filter((rectangulo) => rectangulo.id !== id)
  res.status(200).send({ id })
})
