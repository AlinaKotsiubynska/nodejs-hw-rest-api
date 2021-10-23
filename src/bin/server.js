require('module-alias/register')
const app = require('@root/app')

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running. Use our API on port: ${PORT}`)
})
