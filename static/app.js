function highlight(text) {
    if (!text) return "";
    return text.replace(/(\d+)/g, '<span class="num">$1</span>');
}

async function run() {
    const formData = new FormData();
    formData.append("data_file", dataFile.files[0]);
    formData.append("template_file", templateFile.files[0]);
    formData.append("launch_date", launchDate.value);
    formData.append("p1", p1.value);
    formData.append("p2", p2.value);

    const btn = document.querySelector(".btn-primary");
    btn.disabled = true;
    btn.innerText = "生成中...";

    try {
        const res = await fetch("/process", {
            method: "POST",
            body: formData
        });

        const data = await res.json();

        if (data.ok) {
            summary.innerText = data.summary || "完成";
            report_day.innerHTML = highlight(data.report_day || "");
            report_5day.innerHTML = highlight(data.report_5day || "");
        } else {
            summary.innerText = "失败：" + (data.msg || "未知错误");
        }
    } catch (e) {
        summary.innerText = "失败：" + e;
    } finally {
        btn.disabled = false;
        btn.innerText = "生成首销通报";
    }
}

function copy(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
}