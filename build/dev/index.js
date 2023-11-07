new EventSource('/esbuild').addEventListener('change', () => {
    console.log('Reloading page...');
    location.reload();
})
import { main } from "../../output/Main";
console.log("Loaded PureScript code 🚀");
main();

