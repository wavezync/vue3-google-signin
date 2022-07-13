<script setup lang="ts">
import { useGsiScript } from 'vue3-google-signin';

// load GSI script
const { scriptLoaded, scriptLoadError } = useGsiScript()
</script>