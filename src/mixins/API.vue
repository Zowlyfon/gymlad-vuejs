<script>
const axios = require('axios');

axios.defaults.baseURL = 'https://localhost:5001/api'

export default {
    name: 'API',
    data() {
        return {
            api: axios
        }
    },
}
</script>