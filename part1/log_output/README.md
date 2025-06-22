Käynnistyy komennolla `kubectl apply -f manifests`

Muista myös ajaa `part1/kubernetes` persistent volumen pystytys.

Timestamp, hash ja counter löytyy: [localhost:8081/status](http://localhost:8081/status)

logit aukeaa komennolla `kubectl logs deployments/log-output-dep --all-containers=true -f`
