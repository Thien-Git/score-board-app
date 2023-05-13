$(document).ready(function () {
    var i = 0; //khởi tạo biến đếm

    //Khai báo đối tượng TestScore để lưu thông tin mỗi học sinh.
    var testScore = {
        name: "",
        math: 0,
        physical: 0,
        chemistry: 0
    };

    //---------------------NHAP THONG TIN VAO BANG-------------------------------
    //Hàm chạy khi click vào nút "nhập"(phẩn tử có id ="btnInput")
    $('#btnInput').click(function () {
        //Biến này được tăng thêm 1 mỗi khi click vào button "Nhập"
        i++;
        if (validateInput()) { // hàm validate nếu = true mới thực hiện

            //Các thuộc tính của đối tượng testScore được gán bằng giá trị nhập vào ở các ô input:
            testScore.name = $('#name').val();
            testScore.math = $('#math').val();
            testScore.physical = $('#physical').val();
            testScore.chemistry = $('#chemistry').val();

            //Tạo 1 dòng trống và append các thông tin vào các td
            $('#myTable').append('<tr><td>' + '' + '</td><td>' + testScore.name + '</td><td>' + testScore.math + '</td><td>' + testScore.physical + '</td><td>' + testScore.chemistry + '</td><td>?</td><td><button id="btnEdit">Sửa</button> <span> </span><button id="btnDel">Xóa</button></td></tr>');

            //Duyệt lặp qua các dòng của bảng để chay STT cho đúng với số dòng hiện có
            $('table tbody tr:nth-child(n+2)').each(function (index, tr) {
                $(this.cells[0]).text(index + 1); //Gán giá trị vào ô STT
            })

            //Hàm xóa trắng các ô input
            clearInput();
        }
    });

    //------------------TINH DIEM TRUNG BINH----------------------------------
    //Hàm chạy khi click vào nút "Tính điểm trung bình"(phần tử có id = "diemTB")

    $('#diemTB').click(function () {
        //Duyệt lặp qua các dòng của bảng và xử lý mỗi dòng
        $("table tbody tr:nth-child(n+2)").each(function (index, tr) {
            var math = parseFloat($(this.cells[2]).text()); //lấy điểm toán (number)
            var physical = parseFloat($(this.cells[3]).text()); //lấy điểm lý (number)
            var chemistry = parseFloat($(this.cells[4]).text()); //lấy điểm hóa (number)

            var average = ((math + physical + chemistry) / 3).toFixed(1); //Tính điểm tung bình
            //Gán điểm trung bình vào ô điểm TB
            $(this.cells[5]).text(average);
        });
    })

    //-----------------XAC DINH HS GIOI-----------------------------------
    //Hàm chạy khi click vào nút "XÁc định học sinh giỏi"(phần tử có  id = 'hsGioi )

    $('#hsGioi').click(function () {
        var numberOfGoodStudents = 0; //tạo biến chứa số lượng hs Giỏi

        //Duyệt lặp qua các dòng của bảng và xử lý mỗi dòng
        $('table tbody tr:nth-child(n+2)').each(function (index, tr) {
            var average = parseFloat($(this.cells[5]).text()); //lấy giá trị ô điểm trung bình

            //Kiểm tra điểm TB >= 8 thì set màu bachkground... tại dòng đang thực hiện
            if (average >= 8) {
                numberOfGoodStudents += 1; //Tăng lên 1 nếu có >= 8
                tr.style.backgroundColor = "rgba(243, 144, 144, 0.349)";
                tr.style.color = "red";
            } else {
                tr.style.backgroundColor = "white";
                tr.style.color = "black";
            }
        })

        //Kiểm tra biến đếm và xuất ra thông báo khi vòng lặp trên kết thúc
        if (numberOfGoodStudents == 0) {
            alert('Không có học sinh giỏi');
        } else {
            alert('Có ' + numberOfGoodStudents + ' học sinh giỏi');
        }
    })

    //--------------------XOA DONG--------------------------------
    //Hàm chạy khi click vào nút "Xóa"(phần tử có id = "btnDel")
    //Dùng .on vì  nút "xóa" là phần tử động và nó sẽ trói buộc một sự kiện click vào thằng cha (một element đã tồn tại – dễ nhất thì chính là document) của cái element động đó

    $("#myTable").on("click", "#btnDel", function (e) {
        e.preventDefault();
        var tr = $(this).parent().parent(); //lấy tra phần tử cha là dòng chứa nút xóa mới được click
        tr.remove(); //xóa phần tử cha (dòng)

        //Chay lại STT (Duyệt lặp lại bảng)
        $('table tbody tr:nth-child(n+2)').each(function (index, tr) {
            $(this.cells[0]).text(index + 1); //Gán giá trị vào ô STT
        })
    })

    //--------------------SUA THONG TIN--------------------------------
    //Hàm chạy khi clicl vào nút "Sửa"(phần tử có id ="btnEdit")
    //Dùng .on vì  nút "Sửa" là phần tử động và nó sẽ trói buộc một sự kiện click vào thằng cha (một element đã tồn tại – dễ nhất thì chính là document) của cái element động đó

    var indexRowEdit = 0; //biến chứa index của dòng cần sửa thông tin (biến toàn cục)

    $("#myTable").on("click", "#btnEdit", function (e) {
        e.preventDefault();

        var tr = $(this).parent().parent(); //lấy tra phần tử cha là dòng chứa nút sửa mới được click

        //Gán giá trị lấy từ các ô của hàng vào các ô input
        $('#name').val(tr.children('td').eq(1).text());
        $('#math').val(tr.children('td').eq(2).text());
        $('#physical').val(tr.children('td').eq(3).text());
        $('#chemistry').val(tr.children('td').eq(4).text());

        indexRowEdit = tr.index(); //lấy index của dòng gán vào biến toàn cục đã khai báo trên

        $('#btnInput').addClass('hide'); //ẩn nút nhập bằng thêm class 'hide'
        $('#btnUpdate').removeClass('hide'); //hiện nút Cập nhật bằng cách xóa class 'hide'
    });


    //--------------------CAP NHAT THONG TIN----------------------------
    //Hàm chạy khi click nút Cập nhật (phần tử có id ="btnUpdate");

    $('#btnUpdate').click(function () {
        if (validateInput()) {
            $('#btnInput').removeClass('hide'); //hiện nút "Nhập"
            $('#btnUpdate').addClass('hide'); //Ẩn nút "Cập nhật"

            //Lưu thông tin vào đối tương testScore
            testScore.name = $('#name').val();
            testScore.math = $('#math').val();
            testScore.physical = $('#physical').val();
            testScore.chemistry = $('#chemistry').val();

            //Tìm đến dòng cập nhật bằng biến toàn cục bên trên và gán value từ đối tương testScore vào các ô tương ứng
            $('#myTable tr').eq(indexRowEdit).find('td').eq(1).text(testScore.name);
            $('#myTable tr').eq(indexRowEdit).find('td').eq(2).text(testScore.math);
            $('#myTable tr').eq(indexRowEdit).find('td').eq(3).text(testScore.physical);
            $('#myTable tr').eq(indexRowEdit).find('td').eq(4).text(testScore.chemistry);

            clearInput(); //Xóa trắng ô input
        }
    });

    //--------------------XOA TRANG CAC O INPUT--------------------------

    function clearInput() {
        // Gán vào các ô input = "" để xóa trắng các ô input
        $('#name').val('');
        $('#math').val('');
        $('#physical').val('');
        $('#chemistry').val('');
    }

    //--------------------VALIDATE INPUT--------------------------------
    //Hàm trả về true or false khi kiểm tra các điều kiện

    function validateInput() {
        //Kiểm tra ô nhập tên == 0 thì false
        if ($('#name').val().length == 0) {
            alert('Name is required');
            //trỏ chuột tới ô input nhập tên
            $('#name').focus();
            return false;
        }

        //Kiểm tra điểm toán, lý hóa nếu chưa nhập hoặc nhập nhỏ hơn 0 hoặc lớn hơn 10 thì trả về false, hiển thị thông báo và trỏ chuột tới ô để nhập lại

        if ($('#math').val().length == 0) {
            alert('Math is required')
            $('#math').focus();
            return false;
        } else {
            var mathScore = parseFloat($('#math').val());
            if (mathScore < 0 || mathScore > 10) {
                alert('Incorect math score');
                $('#math').val('');
                $('#math').focus();
                return false;
            }
        }

        if ($('#physical').val().length == 0) {
            alert('Physical is required')
            $('#physical').focus();
            return false;
        } else {
            var physicalScore = parseFloat($('#physical').val());
            if (physicalScore < 0 || physicalScore > 10) {
                alert("Incorrect physical score");
                $('#physical').val('');
                $('#physical').focus();
                return false;
            }
        }

        if ($('#chemistry').val().length == 0) {
            alert('Chemistry is required')
            $('#chemistry').focus();
            return false;
        } else {
            var chemistryScore = parseFloat($('#chemistry').val());
            if (chemistryScore < 0 || chemistryScore > 10) {
                alert("Incorrect chemistry score");
                $('#chemistry').val('');
                $('#chemistry').focus();
                return false;
            }
        }
        return true;
    }

});