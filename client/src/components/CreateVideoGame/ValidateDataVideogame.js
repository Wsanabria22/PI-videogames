const validateData = (data) => {
  console.log('data', data)
  let errors = {};
  if (!data.name)  {
    errors.name = 'Nombre del Video Juego es requerido'
  }
  if (!data.description) {
    errors.description = 'Descripcion del Video Juego es requerida'
  }
  else if (data.description.length < 50) {
    errors.description = 'Descripcion del Video Juego debe ser mas extensa'
  }
  if (data.rating < 0.1 || data.rating > 5) { 
    errors.rating = 'El rating debe estar dentro de un rango de 0.1 a 5'
  }
  if (data.platforms.length === 0) {
    errors.platforms = 'Debe asignar al menos una plataforma para el video juego'
  }
  console.log(errors)
  return errors
}

module.exports = validateData;