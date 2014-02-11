//初始化設定(僅在網頁開啟時載入)
function initLoad() {
    functionKeyEvent();

    //子頁面自訂的script, 如果存在就載入執行
    if (window.pageScript) {
        pageScript();
    }
}
//循環載入(配合AJAX操作方式, javascript無法對重新載入的元件操作, 須重新載入javascript)
function recycleLoad() {
    baseConfig();
    functionSaveBtnEvent();
    
    //子頁面自訂的script, 如果存在就載入執行
    if (window.pageScript) {
        pageScript();
    }
}

//基本操作設定(包含CSS與共通事件)
function baseConfig(){
    //設定背景樣式
//    $("#MasterBtnSet").css({
//        backgroundImage: "url(../Image/SysArea/cssbox_bg1.png)",
//        height: "80px"
//    });
//    $("#DetailBtnSet").css("background-image", "url(../Image/SysArea/cssbox_bg2.png)");

    //定義下拉式選單之寬度與第一個TextBox寬度相同
    //如果該下拉式選單有自訂寬度, 則以自訂寬度為主
    var intWidth = parseInt($(".formarea .subfieldsset input[type=text]:eq(0)").css("width"));
    if (intWidth == 0) {
        intWidth = 120;
    }
    intWidth += 6;
    $(".formarea .subfieldsset select")
        .not('[id$=lsbResult]')
        .each(function(){
            if ($(this).css('width') == undefined){
                $(this).css("width", intWidth + "px");
            }
        });
    //將輸入元件(如:TextBox)的樣式改變為標籤樣式(Label)
    //預設值包含輸入文字欄位屬於readonly or disabled狀態
    $('input.labelStyle')
    .add('table[id$=FormView] :text[readonly]')
    .add('table[id$=FormView] :text[disabled]')
    .css({
        borderStyle: 'None',
        borderBottomStyle: 'solid',
        borderBottomwidth: 'medium',
        borderBottomColor: '#9D9D9D',
        color: '#3C3C3C',
        backgroundColor: 'Transparent'
    });
    //在id結尾名稱為FormView的最後一欄加上25px寬度, 符合開頭與結尾寬度一致的樣式
    $('[id$=FormView] tr td:last-child').css('padding-right', '25px');
    //輸入元件若處於無效狀態(disabled)時, 則取消背景效果
    $(':input[readonly=readonly]')
    .add(':input[disabled=disabled]')
    .css({
        backgroundColor: 'Transparent',
        cursor: 'not-allowed'
    });
    //在GridView的相同行的任一位置按下左鍵時, 則視同按下選擇鍵
    //範本: <a href="javascript: _doPostBack('ctl00$ctl00$ContentPlaceHolder1$ContentPlaceHolderByMasterGridView$MasterGridView','Select$9')">選取</a>
    var regex = /\'Select\$[0-9]{1,}\'\)$/;
    $("table[id$=GridView] tr:has(a)")
    .each(function() {
        strHref = "";
        strHref = $(this).find("a").attr('href');
        if (regex.test(strHref)) {
            $(this).click(function(e) {
                $(location).attr('href', $(this).find("a").attr("href"));
            })
            .css("cursor", "pointer");
        }
    });
    //定義等待圖片的顯示位置, 以labWait元件為主要對齊
    var objLabWait = $('#labWaitPosition');
    var objImgWaitIcon = $('[id$=imgWaitIcon]');
    if (objImgWaitIcon != undefined && objLabWait != undefined) {
        objImgWaitIcon.css({
            position: 'absolute',
            top: objLabWait.position().top - 5,
            left: objLabWait.position().left - 20
        });
    }
}
//設定所有主要按鈕對應功能鍵
function functionKeyEvent() {
    // 擋 IE 按下 F1 鈕時會觸發的 onhelp 事件
    window.onhelp = function() { return false; }

    //定義F1~F10所對應的Button物件
    var objForms = $(window);

    objForms.bind('keydown', 'f1', function(evt) {
        var objBtnFirstRecord = $("#MasterBtnSet [id$=btnFirstRecord]");
        if (objBtnFirstRecord.attr("disabled") != "disabled") {
            objBtnFirstRecord.click();
        }
        return false;
    });
    objForms.bind('keydown', 'f2', function(evt) {
        var objBtnPrevRecord = $("#MasterBtnSet [id$=btnPrevRecord]");
        if (objBtnPrevRecord.attr("disabled") != "disabled") {
            objBtnPrevRecord.click();
        }
        return false;
    });
    objForms.bind('keydown', 'f3', function(evt) {
        var objBtnNextRecord = $("#MasterBtnSet [id$=btnNextRecord]");
        if (objBtnNextRecord.attr("disabled") != "disabled") {
            objBtnNextRecord.click();
        }
        return false;
    });
    objForms.bind('keydown', 'f4', function(evt) {
        var objBtnLastRecord = $("#MasterBtnSet [id$=btnLastRecord]");
        if (objBtnLastRecord.attr("disabled") != "disabled") {
            objBtnLastRecord.click();
        }
        return false;
    });
    objForms.bind('keydown', 'f5', function(evt) {
        var objBtnAddRecord = $("#MasterBtnSet [id$=btnAddRecord]");
        if (objBtnAddRecord.attr("disabled") != "disabled") {
            objBtnAddRecord.click();
        }
        return false;
    });
    objForms.bind('keydown', 'f6', function(evt) {
        var objBtnEditRecord = $("#MasterBtnSet [id$=btnEditRecord]");
        if (objBtnEditRecord.attr("disabled") != "disabled") {
            objBtnEditRecord.click();
        }
        return false;
    });
    objForms.bind('keydown', 'f7', function(evt) {
        var objBtnDeleteRecord = $("#MasterBtnSet [id$=btnDeleteRecord]");
        if (objBtnDeleteRecord.attr("disabled") != "disabled") {
            objBtnDeleteRecord.click();
        }
        return false;
    });
    objForms.bind('keydown', 'f8', function(evt) {
        var objBtnQueryRecord = $("#MasterBtnSet [id$=btnQueryRecord]");
        if (objBtnQueryRecord.attr("disabled") != "disabled") {
            objBtnQueryRecord.click();
            $('#MasterBtnSet :submit').each(function() {
                $(this).attr('disabled', 'disabled');
                $(this).addClass('btn_disabled');
            });
        }
        return false;
    });
    objForms.bind('keydown', 'f9', function(evt) {
        var objBtnDoneRecord = $("#MasterBtnSet [id$=btnDoneRecord]");
        if (objBtnDoneRecord.attr("disabled") != "disabled") {
            objBtnDoneRecord.click();
        }
        return false;
    });
    objForms.bind('keydown', 'f10', function(evt) {
        var objBtnCancelRecord = $("#MasterBtnSet [id$=btnCancelRecord]");
        if (objBtnCancelRecord.attr("disabled") != "disabled") {
            objBtnCancelRecord.click();
        }
        return false;
    });
    objForms.bind('keydown', 'f11', function(evt) {
        var objBtnExitRecord = $("#MasterBtnSet [id$=btnExitRecord]");
        if (objBtnExitRecord.attr("disabled") != "disabled") {
            objBtnExitRecord.click();
        }
        return false;
    });
}
//針對儲存與取消按鈕額外加入輸入元件對應功能鍵
function functionSaveBtnEvent() {
    var objBtnDoneRecord = $("#MasterBtnSet [id$=btnDoneRecord]");
    var objBtnCancelRecord = $("#MasterBtnSet [id$=btnCancelRecord]");
    if (objBtnDoneRecord.attr('disabled') != 'disabled') {
        $(':input').bind('keydown', 'f9', function(evt) {
            objBtnDoneRecord.click();
            return false;
        });
    }
    if (objBtnCancelRecord.attr('disabled') != 'disabled') {
        $(':input').bind('keydown', 'f10', function(evt) {
            objBtnCancelRecord.click();
            return false;
        });
    }
}
