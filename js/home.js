    // Configure o Firebase com suas credenciais
    const firebaseConfig = {
        apiKey: "AIzaSyCS7vTqiIYfI4EkfDpvNdKSoVDW9tcDsUU",
        authDomain: "esp-solar.firebaseapp.com",
        databaseURL: "https://esp-solar-default-rtdb.firebaseio.com",
        projectId: "esp-solar",
        storageBucket: "esp-solar.appspot.com",
        messagingSenderId: "858260283726",
        appId: "1:858260283726:web:e71a76062fd84edffa3e1f",
        measurementId: "G-PZ2MRL7J07"
    };
    // Inicialize o Firebase
    firebase.initializeApp(firebaseConfig);
    // Referência para o nó do banco de dados que você deseja acessar
    const database = firebase.database();
    const dataTenCor = database.ref('Tensao_Corrente');
    const dataPotDia = database.ref('Consumo_Diario'); 
    const dataPotMes = database.ref('Consumo_Mes'); 
    

    // Função para exibir os últimos 7 dados do Firebase na página HTML
    function displayLastSevenData(snapshot) {
        const placamper = document.getElementById('placamper');
        placamper.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados
        const placavolts = document.getElementById('placavolts');
        placavolts.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados
        const tensBate = document.getElementById('tensBate');
        tensBate.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados
        const dataCorre = document.getElementById('dataCorre');
        dataCorre.innerHTML = '';
        const dataTens = document.getElementById('dataTens');
        dataCorre.innerHTML = '';
        const dataBat = document.getElementById('dataBat');
        dataCorre.innerHTML = '';
        const dataConsDia = document.getElementById('dataConsDia');
        dataCorre.innerHTML = '';
        const dataConsMes = document.getElementById('dataConsMes');
        dataCorre.innerHTML = '';
        

        const dataArr = [];
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
                dataArr.push({ Data: data.Data, CorrPlaca: data.CorrPlaca, TensPlaca: data.TensPlaca, Status: data.Status, TensBate:data.TensBate });
        });

        console.log(dataArr);

        // Ordena os dados pela data mais recente
        dataArr.sort((a, b) => b.Data - a.Data);
        // Pega apenas os últimos 7 elementos
        const lastSevenData = dataArr.slice(-1); // Alteração aqui, de -1 para 7
        // Monta uma string com os últimos 7 dados

        let lastSevenString2 = "";
        lastSevenData.forEach(data => {
            lastSevenString2 += /*data.Data + ': ' + */ data.CorrPlaca.toFixed(3); // Altere de acordo com sua estrutura de dados
        });
        let lastSevenString4 = "";
        lastSevenData.forEach(data => {
            lastSevenString4 += /*data.Data + ': ' + */ data.Data;
        });
        let lastSevenString3 = "";
        lastSevenData.forEach(data => {
            lastSevenString3 += /*data.Data + ': ' + */ data.TensPlaca.toFixed(2);// Altere de acordo com sua estrutura de dados
        });
        let lastSevenString5 = "";
        lastSevenData.forEach(data => {
            lastSevenString5 += /*data.Data + ': ' + */ data.TensBate.toFixed(2);// Altere de acordo com sua estrutura de dados
        });
        let lastSevenString8 = "";
        lastSevenData.forEach(data => {
            lastSevenString8 += /*data.Data + ': ' + */ data.Status +'\n'; // Altere de acordo com sua estrutura de dados
            if (data.Status == "REDE") {
                document.getElementById('statusSolar').style.display = 'none';
                document.getElementById('statusRede').style.display = 'block';
            } 
            else{
                document.getElementById('statusRede').style.display = 'none';
                document.getElementById('statusSolar').style.display = 'block';
            }
        });
        // Adiciona a string com os últimos 7 dados ao elemento redeamper
        placamper.textContent = lastSevenString2;
        placavolts.textContent = lastSevenString3;
        tensBate.textContent = lastSevenString5;
        dataCorre.textContent = lastSevenString4;
        dataTens.textContent = lastSevenString4;
        dataBat.textContent = lastSevenString4;
        dataConsDia.textContent = lastSevenString4;
        dataConsMes.textContent = lastSevenString4;
        status.textContent = lastSevenString8;
    }

    function consumoDiario(snapshot) {       
        const consDiaPlaca = document.getElementById('consDiaPlaca');
        consDiaPlaca.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados

        const dataArr = [];
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
                dataArr.push({ConsPlacaDia: data.ConsPlacaDia});
        });


        // Ordena os dados pela data mais recente
        dataArr.sort((a, b) => b.Data - a.Data);
        // Pega apenas os últimos 7 elementos
        const lastSevenData = dataArr.slice(-1); // Alteração aqui, de -1 para 7
        // Monta uma string com os últimos 7 dados
        let consumoDiario2 = "";
        lastSevenData.forEach(data => {
            consumoDiario2 += /*data.Data + ': ' + */ data.ConsPlacaDia.toFixed(2); // Altere de acordo com sua estrutura de dados
        });


        // Adiciona a string com os últimos 7 dados ao elemento redeamper
        consDiaPlaca.textContent = consumoDiario2;
    }

    // Função para exibir o consumo mensal do Firebase na página HTML
    function consumoMes(snapshot) {
        const consMesPlaca = document.getElementById('consMesPlaca');
        consMesPlaca.innerHTML = ''; // Limpa o conteúdo antes de adicionar novos dados


        const dataArr = [];
        snapshot.forEach(childSnapshot => {
            const data = childSnapshot.val();
                dataArr.push({ConsPlacaMes: data.ConsPlacaMes });
        });

        // Ordena os dados pela data mais recente
        dataArr.sort((a, b) => b.Data - a.Data);
        // Pega apenas os últimos 7 elementos
        const lastSevenData = dataArr.slice(-1); // Alteração aqui, de -1 para 7
        // Monta uma string com os últimos 7 dados

        let consumoMes2 = "";
        lastSevenData.forEach(data => {
            consumoMes2 += /*data.Data + ': ' + */ data.ConsPlacaMes.toFixed(2); // Altere de acordo com sua estrutura de dados
        });

        // Adiciona a string com os últimos 7 dados ao elemento redeamper
        consMesPlaca.textContent = consumoMes2;
    }


        // Adicione um listener para atualizar os últimos 7 dados em tempo real
    dataTenCor.on('value', snapshot => {
        displayLastSevenData(snapshot);
    });
    dataPotDia.on('value', snapshot => {
        consumoDiario(snapshot);
    });
    dataPotMes.on('value', snapshot => {
        consumoMes(snapshot);
    });