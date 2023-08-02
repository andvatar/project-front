const raceList =
    '<select aria-label=".form-select-lg example" id="raceSelect" disabled style="width:auto;">' +
        '<option value="HUMAN">HUMAN</option>' +
        '<option value="DWARF">DWARF</option>' +
        '<option value="ELF">ELF</option>' +
        '<option value="GIANT">GIANT</option>' +
        '<option value="ORC">ORC</option>' +
        '<option value="TROLL">TROLL</option>' +
        '<option value="HOBBIT">HOBBIT</option>' +
    '</select>'

const professionList =
    '<select aria-label=".form-select-lg example" id="professionSelect" disabled style="width:auto;">' +
        '<option value="WARRIOR">WARRIOR</option>' +
        '<option value="ROGUE">ROGUE</option>' +
        '<option value="SORCERER">SORCERER</option>' +
        '<option value="CLERIC">CLERIC</option>' +
        '<option value="PALADIN">PALADIN</option>' +
        '<option value="NAZGUL">NAZGUL</option>' +
        '<option value="WARLOCK">WARLOCK</option>' +
        '<option value="DRUID">DRUID</option>' +
    '</select>'

function getPlayers(pageNumber, pageSize) {
    let getUrl = pageNumber===undefined || pageSize===undefined ? '/rest/players' : '/rest/players?pageNumber='+pageNumber+'&pageSize='+pageSize
    $.get(getUrl, function (myData) {
        //console.log(myData)
        // не разобрался(
        //$('#mainTable').bootstrapTable('load', myData)
        let table = $('#mainTable')
        table.find("tr:gt(0)").remove()
        $.each(myData, function (i, item) {
            let row = '<tr class="dropdown">'
            row += '<td id="id">' + item.id + '</td>'
            row += '<td id="name">' + item.name + '</td>'
            row += '<td id="title">' + item.title + '</td>'
            row += '<td id="race">' + raceList + '</td>>'
            row += '<td id="profession">' + professionList + '</td>>'
            row += '<td id="level">' + item.level + '</td>'
            row += '<td id="birthdate">' + $.datepicker.formatDate('dd.mm.yy', new Date(item.birthday))+'</td>'
            row += '<td id="banned"> <input class="form-check-input" type="checkbox" id="inputbanned"' + (item.banned ? "checked" : "") + '></td>'
            row += '<td id="edit"><button type="button" class="btn btn-success" id="editbutton"><i class="bi bi-pen" id="editIcon"></i></button><button type="button" class="btn btn-primary" style="display: none;" id="savebutton"><i class="bi bi-save" id="saveIcon"></i></button></td>'
            row += '<td id="delete"><button type="button" class="btn btn-danger" id="deletebutton"><i class="bi bi-trash" id="deleteIcon"></i></button></td>'
            row += '</tr>'
            table.append(row)
            table.find('tr:last').find('td').find('#raceSelect').val(item.race)
            table.find('tr:last').find('td').find('#professionSelect').val(item.profession)
            //table.find('tr').find('#tdrace').append(raceList)
        })
        table.find('tr').find('td').find('#inputbanned').attr('disabled', true)
        table.find('tr').find('td').find('#raceSelect').addClass('form-select')
        table.find('tr').find('td').find('#professionSelect').addClass('form-select')
    })
}

function createPagination() {
    $.get('/rest/players/count', function (count) {
        let ul1 = $('#ul1')
        ul1.empty()
        for (let i = 0; i < Math.ceil(count / document.getElementById('accounts').value); i++) {
            ul1.append('<li class="page-item"><a>' + (i + 1) + '</a></li>')
            ul1.find('li').addClass('page-item')
            ul1.find('li').find('a').addClass('page-link')
            ul1.find('li').find('a').attr('ref', '#')
        }
        $('#ul1 li:first').addClass('active')
    })
}

function getActivePage() {
    return $('.active').find('a').text()
}