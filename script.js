// نظام التوجيه الصوتي لكبار السن والمكفوفين
function speak(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel(); 
        let speech = new SpeechSynthesisUtterance(text);
        speech.lang = 'ar-SA';
        speech.rate = 0.9; 
        window.speechSynthesis.speak(speech);
    }
    
    // تحديث الشاشة المكتوبة فوراً لدعم الصم وضعاف السمع
    document.getElementById('notify-screen').innerHTML = `💬 <b>إشعار النظام الذكي:</b> ${text}`;
}

// تحديث دائرة الالتزام البيانية بشكل متحرك
function updateChart(percent, color) {
    const bar = document.getElementById('progress-bar');
    const text = document.getElementById('progress-text');
    bar.style.background = `conic-gradient(${color} ${percent}%, #eaecf4 ${percent}% 100%)`;
    text.innerText = `${percent}%`;
}

// 1. تشغيل تنبيه اليوم
function triggerDayAlert() {
    document.getElementById('monday-box').classList.add('active-day-led');
    document.getElementById('morn-slot').classList.remove('active-time-led', 'slot-taken');
    document.getElementById('morn-slot').innerHTML = "MORN <small>⠍⠕⠗⠝</small>";
    
    updateChart(30, '#e74a3b'); // لون أحمر يدل على وجود تنبيه نشط لم يتم أخذه
    document.getElementById('ai-insight').innerText = "تم رصد تنبيه نشط اليوم. المستشعرات تنتظر تركيب العلبة خلف الجوال لبدء فلترة المواعيد.";
    
    speak("تنبيه، حان موعد علبة يوم الإثنين، يرجى وضع العلبة خلف الهاتف.");
}

// 2. محاكاة تركيب العلبة خلف الجوال
function attachToPhone() {
    const dayBox = document.getElementById('monday-box');
    
    if (dayBox.classList.contains('active-day-led')) {
        dayBox.classList.remove('active-day-led');
        
        const mornSlot = document.getElementById('morn-slot');
        mornSlot.classList.add('active-time-led');
        
        updateChart(60, '#4e73df'); // لون أزرق يدل على التوجيه للفترة
        document.getElementById('ai-insight').innerText = "الذكاء الاصطناعي وجّه مستشعرات العلبة لإضاءة خانة الصباح (MORN). يرجى فتح الخانة وأخذ الجرعة.";
        
        speak("تم ربط العلبة بالهاتف بنجاح. يرجى أخذ جرعة الفترة الصباحية الآن، الضوء يضيء على الخانة المطلوبة.");
    } else {
        speak("يرجى تفعيل تنبيه اليوم أولاً لإتمام المحاكاة بالشكل الصحيح.");
    }
}

// 3. تأكيد أخذ الجرعة
function takeMedication(periodName) {
    const mornSlot = document.getElementById('morn-slot');
    
    if (mornSlot.classList.contains('active-time-led')) {
        mornSlot.classList.remove('active-time-led');
        mornSlot.classList.add('slot-taken');
        mornSlot.innerHTML = "✅ تم الأخذ";
        
        updateChart(100, '#1cc88a'); // لون أخضر مكتمل 100% الالتزام مثالي
        document.getElementById('ai-insight').innerText = "تحليل الذكاء الاصطناعي: المريض التزم بالوقت بدقة عالية جداً. تم حفظ البيانات وإرسال تقرير الأمان إلى الطبيب المعالج.";
        
        speak("ممتاز، تم تسجيل أخذ جرعة صباحاً بنجاح. يومك سعيد!");
    }
}