import axios from "axios"
import MockAdapter from "axios-mock-adapter"

const mock = new MockAdapter(axios, { delayResponse: 1000 })
export default mock

require("./workspace")
require("./entry")
require("./user")
require("./auth")
