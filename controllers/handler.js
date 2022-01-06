const datapath = require('../useraccount.json');
const fs = require('fs');
const e = require('express');
// //create task
// exports.createTask = (req, res) => {
//     var existAccounts = getUserData()
//     console.log("ssdss")
//     var lastId = 0;
//     console.log("existAccounts",existAccounts.length)

//     if (existAccounts && existAccounts.length > 0) {
//         var lastaccount = existAccounts[existAccounts.length - 1]
//         console.log("lastaccount",lastaccount)

//         if (lastaccount && lastaccount.subtasks && lastaccount.subtasks.length > 0) {
//             var lastsubtask = lastaccount.subtasks[lastaccount.subtasks.length - 1]
//             lastId = lastsubtask.taskID;
//         } else {
//             lastId = lastaccount.taskID;
//         }
//     }
//     console.log("lastId",lastId)
//     const newObj = Object.assign({ taskID: ++lastId }, req.body);
//     console.log("newObj",newObj)
//     console.log("lastId1",lastId)
//     for (let j = 0; j < newObj.subtasks.length; j++) {
//         newObj.subtasks[j] = Object.assign({ taskID: ++lastId }, newObj.subtasks[j]);
//     }
//     existAccounts.push(newObj)
//     saveUserData(existAccounts);
//     res.send({ success: true, msg: 'task added successfully' })
// };

//create task
exports.createTask = (req, res) => {
    var existAccounts = getUserData()
    console.log("ssdss")
    var lastId = 0;
    var subtasks=[]
    console.log("existAccounts",existAccounts.length)

    if (existAccounts && existAccounts.length > 0) {
        var lastaccount = existAccounts[existAccounts.length - 1]
        console.log("lastaccount",lastaccount)

        if (lastaccount && lastaccount.subtasks && lastaccount.subtasks.length > 0) {
            var lastsubtask = lastaccount.subtasks[lastaccount.subtasks.length - 1]
            console.log("lastsubtask",lastsubtask)

            lastId = lastsubtask.taskID;
        } else {
            lastId = lastaccount.taskID;
        }
    }
    console.log("lastId",lastId)
    const newObj = Object.assign({ taskID: ++lastId }, req.body);
    newObj['subtasks']=subtasks
    console.log("newObj",newObj)
    console.log("lastId1",lastId)
    // for (let j = 0; j < newObj.subtasks.length; j++) {
    //     newObj.subtasks[j] = Object.assign({ taskID: ++lastId }, newObj.subtasks[j]);
    // }
    existAccounts.push(newObj)
    saveUserData(existAccounts);
    res.send({ success: true, msg: 'task added successfully' })
};
//create sub task
exports.createSubTask = (req, res) => {
    console.log("ssgfdgfdgddss")
    var existAccounts = getUserData()
    var task_id = req.params['taskid']
    var sub_task_id = ++task_id;
    console.log("ids",task_id,sub_task_id)
    let task = existAccounts.find(obj => obj.taskID == task_id);
    console.log("task",task)
    console.log("tyoe",type(task))
    console.log("existAccounts",existAccounts.length)
    if (existAccounts && existAccounts.length > 0) {
        var lastaccount = existAccounts[existAccounts.length - 1]
        console.log("lastaccount",lastaccount)
        if (lastaccount && lastaccount.subtasks && lastaccount.subtasks.length > 0) {
            var lastsubtask = lastaccount.subtasks[lastaccount.subtasks.length - 1]
            lastId = lastsubtask.taskID;
        } else {
            lastId = lastaccount.taskID;
        }
    }
   // const newObj = Object.assign({ taskID: ++lastId }, req.body);
    for (let j = 0; j < newObj.subtasks.length; j++) {
        newObj.subtasks[j] = Object.assign({ taskID: ++lastId }, newObj.subtasks[j]);
    }
    existAccounts.push(newObj)
    saveUserData(existAccounts);
    res.send({ success: true, msg: 'task added successfully' })
};

//create task property
exports.addProperty = (req, res) => {
    fs.readFile('useraccount.json', 'utf8', (err, data) => {
        var existAccounts = getUserData()
        const task_id = req.params['id']
        let task = existAccounts.find(obj => obj.taskID == task_id);
        let existingObj =task;
        const newReqObj= req.body
        const keys = Object.keys(newReqObj);
        keys.forEach((key, index) => {
            existingObj[key] = newReqObj[key];
         });
        saveUserData(existAccounts);
        res.send({ success: true, msg: 'Task property added successfully' })
    });
};
//create subtasktask property
exports.addSubtaskProperty = (req, res) => {
    var existAccounts = getUserData()
    fs.readFile('useraccount.json', 'utf8', (err, data) => {
        const taskId = req.params['taskid'];
        const subtask_id = req.params['subtaskid']
        let task = existAccounts.find(obj => obj.taskID == taskId);
        let subtasks = task.subtasks
        let sub_task = subtasks.find(obj => obj.taskID == subtask_id);
        let existingObj =sub_task;
        const newReqObj= req.body
        const keys = Object.keys(newReqObj);
        keys.forEach((key, index) => {
          existingObj[key] = newReqObj[key];
       });
        saveUserData(existAccounts);
        res.send({ success: true, msg: 'Subtask updated successfully' })
    });
};
//get tasks
exports.getTasks = (req, res) => {
    const users = getUserData()
    res.send(users)
};
//get particular task
exports.getTask = (req, res) => {
    const existAccounts = getUserData()
    fs.readFile('useraccount.json', 'utf8', (err, data) => {
        const taskId = req.params['id'];
        let task = existAccounts.find(obj => obj.taskID == taskId);
        res.send({ success: true, task: task })
    });
};
//update task
exports.updateTask = (req, res) => {
    var existAccounts = getUserData()
    fs.readFile('useraccount.json', 'utf8', (err, data) => {
        const taskId = req.params['id'];
        let task = existAccounts.find(obj => obj.taskID == taskId);
        let existingObj =task;
        const newReqObj= req.body
        const keys = Object.keys(newReqObj);
        keys.forEach((key, index) => {
          existingObj[key] = newReqObj[key];
       });
        saveUserData(existAccounts);
        res.send({ success: true, msg: 'Task updated successfully' })
    });
}
//update task
exports.updateSubTask = (req, res) => {
    var existAccounts = getUserData()
    fs.readFile('useraccount.json', 'utf8', (err, data) => {
        const taskId = req.params['taskid'];
        const subtask_id = req.params['subtaskid']
        let task = existAccounts.find(obj => obj.taskID == taskId);
        let subtasks = task.subtasks
        let sub_task = subtasks.find(obj => obj.taskID == subtask_id);
        let existingObj =sub_task;
        const newReqObj= req.body
        const keys = Object.keys(newReqObj);
        keys.forEach((key, index) => {
          existingObj[key] = newReqObj[key];
       });
        saveUserData(existAccounts);
        res.send({ success: true, msg: 'Subtask updated successfully' })
    });
}
//delete task
exports.deleteTask = (req, res) => {
   fs.readFile('useraccount.json', 'utf8', (err, data) => {
        var existAccounts = getUserData()
        const task_id = req.params['id']
        let index = existAccounts.findIndex(obj => obj.taskID == task_id);
        existAccounts.splice(index, 1);
        saveUserData(existAccounts);
        res.send({ success: true, msg: 'Task removed successfully' })
    });
}
//delete subtasktaskProperty
exports.deleteTaskProperty = (req, res) => { 
    fs.readFile('useraccount.json', 'utf8', (err, data) => {
        var existAccounts = getUserData()
        const task_id = req.params['id']
        const propertyName = req.params['propertyName']
        let index = existAccounts.findIndex(obj => obj.taskID == task_id);
        delete existAccounts[index][propertyName]
        saveUserData(existAccounts);
        res.send({ success: true, msg: 'Task property removed successfully' })
    });
}
//delete subtasktask
exports.deleteSubTask = (req, res) => {
    fs.readFile('useraccount.json', 'utf8', (err, data) => {
        var existAccounts = getUserData()
        const task_id = req.params['taskid']
        const subtask_id = req.params['subtaskid']
        let task = existAccounts.find(obj => obj.taskID == task_id);
        let subtasks = task.subtasks
        let index = subtasks.findIndex(obj => obj.taskID == subtask_id);
       // console.log("index",index)
        subtasks.splice(index, 1);
        saveUserData(existAccounts);
        res.send({ success: true, msg: 'Subtask removed successfully'})
    });
}

//delete suntasktaskProperty
exports.deleteSubTaskProperty = (req, res) => { 
    fs.readFile('useraccount.json', 'utf8', (err, data) => {
        var existAccounts = getUserData()
        const task_id = req.params['taskid']
        const subtask_id = req.params['subtaskid']
        const propertyName = req.params['propertyName']
        existAccounts.find(obj => obj.taskID == task_id);
        let task = existAccounts.find(obj => obj.taskID == task_id);
        let subtasks = task.subtasks
        let index = subtasks.findIndex(obj => obj.taskID == subtask_id);
        delete subtasks[index][propertyName]
        saveUserData(existAccounts);
        res.send({ success: true, msg: 'Subtask property removed successfully' })
    });
}

//read the user data from json file
const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('useraccount.json', stringifyData)
}

//get the user data from json file

const getUserData=()=>{
    const jsonData=fs.readFileSync('useraccount.json')
    return JSON.parse(jsonData);
}