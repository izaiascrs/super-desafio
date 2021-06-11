const Modal = { 
    open() {
        document.querySelector('.modal-overlay')
        .classList.add('active');
        // Utils.setDefaultFormDate();
    },
    
    close() {
        document.querySelector('.modal-overlay')
        .classList.remove('active')
        // Form.clearFields();
    }
}

const base_url = 'http://localhost:5000/api/v1';

const form = document.querySelector('.modal form');


const getInputFormValues = (array) => {
    let values = array.map( el => {
        return document.querySelector(`form input#${el}`);
    });
    return values;
}

const saveDoctor = async (doctor) => {
    try {
        const data =  await fetch(`${base_url}/doctors`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(doctor)
            });
            
        await data.json();

        alert('Médico cadastrado')
        
    } catch (error) {
        alert(error)
        console.log(error);
    }
}

const savePatient = async (patient) => {
    try {
        const data =  await fetch(`${base_url}/patients`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(patient)
            });
            
        await data.json();

        alert('Paciente cadastrado')
        
    } catch (error) {
        alert(error)
        console.log(error);
    }
}

const saveCase = async (caso) => {
    try {
        await fetch(`${base_url}/cases`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(caso)
            });
            
        alert('Caso cadastrado')
        
    } catch (error) {
        alert(error)
        console.log(error);
    }
}

const saveTomography = async (tomography) => {
    try {
        await fetch(`${base_url}/tomography`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(tomography)
            });
            
        alert('Tomografia cadastrada')
        
    } catch (error) {
        alert(error)
        console.log(error);
    }
}

const getUfs = async () => {
    const data = await fetch(`${base_url}/ufs`);
    const ufs = await data.json();

    ufs.map(uf => {
        const option = document.createElement('option');

        option.value = uf.id;
        option.innerText = uf.uf_nome;

        ufDropdown.appendChild(option)

        // console.log(option);
    })
}

const generateInputForm = (arrayFields, title) => {
          
    const buttonsBox = document.createElement('div');
    const closeBtn = document.createElement('a');
    const saveBtn = document.createElement('button');

    const formTitle = document.createElement('h2');

    formTitle.innerText= `Cadastrar ${title}`

    buttonsBox.classList.add('input-group');
    buttonsBox.classList.add('actions');
    
    closeBtn.classList.add('button');
    closeBtn.classList.add('cancel');
    closeBtn.setAttribute('href', '#' );
    closeBtn.setAttribute('onclick', 'Modal.close()');
    closeBtn.innerText = 'Cancelar';

    saveBtn.innerText = 'Salvar';

    buttonsBox.appendChild(closeBtn);
    buttonsBox.appendChild(saveBtn);

    const modal = document.querySelector('#form')
    const formBox = document.createElement('form');
    formBox.appendChild(formTitle);
 
    
    arrayFields.map(field => {

        const str = field.name.replace(/_/g, ' ');
        
        const FormInputGroup = document.createElement('div');
        const FormInputLabel = document.createElement('label');
        const FormInput = document.createElement('input');
        FormInput.required = true;
        
        FormInputGroup.classList.add('input-group');
        
        FormInputGroup.appendChild(FormInputLabel);
        FormInputGroup.appendChild(FormInput);
        
        FormInputLabel.setAttribute('for', field.name);
        FormInputLabel.innerText = str;
        
        FormInput.setAttribute('type', field.type); 
        FormInput.setAttribute('id', field.name); 
        FormInput.setAttribute('name', field.name); 
        // FormInput.setAttribute('placeholder', field.name); 
        formBox.appendChild(FormInputGroup);
        formBox.appendChild(buttonsBox);       
        
    });

    modal.appendChild(formBox);
    
};

const clearForm = () => {
    const form = document.querySelector('.modal form');
    return form.remove();
};

const submitForm = (fn) => {
    const form = document.querySelector('.modal form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await fn();
        Modal.close();
    })
}

const patientModal = () => {
    const patientFields = [
        { name: 'médico', type: 'text' },
        { name: 'nome', type: 'text' },
        { name: 'iniciais', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'telefone', type: 'text' },
        { name: 'data_de_nascimento', type: 'date' },
    ];
    
    clearForm();
    generateInputForm(patientFields, 'Paciente');
    Modal.open();


    let values = patientFields.map(el => {
        return document.querySelector(`form input#${el.name}`)
    });
    
    submitForm(async () => {
        const patientData = {}
        values.map(el => patientData[el.name] = el.value);
        
        await savePatient({
            nome: patientData.nome,
            medico_id: patientData.médico,
            iniciais: patientData.iniciais,
            email: patientData.email,
            telefone: patientData.telefone,
            data_nasc: patientData.data_de_nascimento,
        })
    })

}

const doctorModal = () => {
    
    const doctorFields = [
        { name: 'nome', type: 'text' },
        { name: 'email', type: 'email' },
        { name: 'telefone', type: 'text' },
        { name: 'data_de_nascimento', type: 'date' },
        { name: 'uf', type: 'text' },
        { name: 'crm', type: 'text' },
    ];

    clearForm();
    generateInputForm(doctorFields, 'Médico');
    Modal.open();

    let values = doctorFields.map(el => {
        return document.querySelector(`form input#${el.name}`)
    });
    
    submitForm(async () => {
        const doctorData = {}
        values.map(el => doctorData[el.name] = el.value);
        
        await saveDoctor({
            nome: doctorData.nome,
            email: doctorData.email,
            telefone: doctorData.telefone,
            data_nasc: doctorData.data_de_nascimento,
            uf_id: doctorData.uf,
            crm: doctorData.crm
        })
    })

}

const casesModal = () => {
    const casesFields = [
        { name: 'nome_do_médico', type: 'text' },
        { name: 'nome_do_paciente', type: 'text' },
        { name: 'data_da_cirurgia', type: 'date' },
        { name: 'codigo_do_caso', type: 'text' },
        { name: 'status', type: 'text' },
    ];
    
    clearForm();
    generateInputForm(casesFields, 'Caso');
    
    Modal.open();

    let values = casesFields.map(el => {
        return document.querySelector(`form input#${el.name}`)
    });
    
    submitForm(async () => {
        const caseData = {}
        values.map(el => caseData[el.name] = el.value);
        
        try {
            await saveCase({
                medico_id: caseData.nome_do_médico,
                paciente_id: caseData.nome_do_paciente,
                data_cirurgia: caseData.data_da_cirurgia,
                codigo_caso: caseData.codigo_do_caso,
                status_id: caseData.status,
            })
            
        } catch (error) {
            alert(error)
        }        
    })
}

const tomographyModal = () => {
    const tomographyFields = [
        { name: 'caso', type: 'text' },
        { name: 'paciente', type: 'text' },
        { name: 'código_do_projeto', type: 'text' },
        { name: 'espessura_do_tc', type: 'number' },
        { name: 'dicon', type: 'file' },
    ];
    
    clearForm();
    generateInputForm(tomographyFields, 'Tomografia');
    Modal.open();

    let values = tomographyFields.map(el => {
        return document.querySelector(`form input#${el.name}`)
    });

   
   
    
    
    submitForm(async () => {
        const tomographyData = {}
        values.map(el => tomographyData[el.name] = el.value);
        
        try {
            await saveTomography({
                caso_id: tomographyData.caso,
                paciente_id: tomographyData.paciente,
                codigo_projeto: tomographyData.código_do_projeto,
                espessura_tc: tomographyData.espessura_do_tc,
                dicon: tomographyData.dicon,
            })
            
        } catch (error) {
            alert(error)
        }
        
    })
    
}




// BASE64
function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        element.src = reader.result
    }
    reader.readAsDataURL(file);
}


// const imageInput = document.querySelector('.modal input#dicon');    

// imageInput.addEventListener('change', () => {
//     encodeImageFileAsURL(imageInput);        
// });
