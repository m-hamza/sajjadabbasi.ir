// متغیرهای سراسری
let selectedTense = 'past';

// انتخاب زمان
function selectTense(tense) {
    selectedTense = tense;
    
    // حذف کلاس active از همه دکمه‌ها
    document.querySelectorAll('.tense-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // اضافه کردن کلاس active به دکمه انتخاب شده
    document.querySelector(`[data-tense="${tense}"]`).classList.add('active');
}

// استخراج ریشه فعل از ماضی
function extractRoot(verb) {
    // حذف فتحه‌ها و حرکات
    let cleaned = verb.replace(/[َُِْ]/g, '').trim();
    
    // استخراج ریشه سه حرفی (مثال: کَتَبَ -> کتب)
    if (cleaned.length >= 3) {
        // اگر با الف شروع شود (مثل اَکَلَ)
        if (cleaned[0] === 'ا' && cleaned.length >= 4) {
            return cleaned.substring(1, 4); // حذف الف اول و گرفتن سه حرف بعدی
        }
        // برای افعال عادی سه حرفی
        if (cleaned.length >= 3) {
            return cleaned.substring(0, 3);
        }
    }
    
    return cleaned;
}

// اضافه کردن اعراب به صرف فعل در ماضی
function addPastDiacritics(faal, ayn, lam, suffix) {
    if (suffix === '') {
        // هو: ضَرَبَ (فتحه روی ض و ر، سکون روی ب)
        return `${faal}${ayn}${lam}`;
    } else if (suffix === 'ا') {
        // هما (مذکر): ضَرَبَا
        return `${faal}${ayn}${lam}ا`;
    } else if (suffix === 'ُوا') {
        // هم: ضَرَبُوا
        return `${faal}${ayn}${lam}ُوا`;
    } else if (suffix === 'َت') {
        // هی: ضَرَبَتْ
        return `${faal}${ayn}${lam}َت`;
    } else if (suffix === 'َتَا') {
        // هما (مؤنث): ضَرَبَتَا
        return `${faal}${ayn}${lam}َتَا`;
    } else if (suffix === 'نَ') {
        // هن: ضَرَبْنَ
        return `${faal}${ayn}${lam}نَ`;
    } else if (suffix === 'تَ') {
        // انت (مذکر): ضَرَبْتَ
        return `${faal}${ayn}${lam}تَ`;
    } else if (suffix === 'تُمَا') {
        // انتما: ضَرَبْتُمَا (فتحه روی ض، سکون روی ر)
        return `${faal}${ayn}${lam}تُمَا`;
    } else if (suffix === 'تُم') {
        // انتم: ضَرَبْتُمْ
        return `${faal}${ayn}${lam}تُم`;
    } else if (suffix === 'تِ') {
        // انت (مؤنث): ضَرَبْتِ
        return `${faal}${ayn}${lam}تِ`;
    } else if (suffix === 'تُنَّ') {
        // انتن: ضَرَبْتُنَّ
        return `${faal}${ayn}${lam}تُنَّ`;
    } else if (suffix === 'تُ') {
        // انا: ضَرَبْتُ
        return `${faal}${ayn}${lam}تُ`;
    } else if (suffix === 'نَا') {
        // نحن: ضَرَبْنَا
        return `${faal}${ayn}${lam}نَا`;
    }
    return `${faal}${ayn}${lam}${suffix}`;
}

// اضافه کردن اعراب به صرف فعل در مضارع
function addPresentDiacritics(prefix, faal, ayn, lam, suffix) {
    // در مضارع، حرف اول ریشه (ف) ممکن است تغییر کند
    let presentFaal = faal;
    if (faal === 'و' || faal === 'ي') {
        presentFaal = 'ي';
    }
    
    if (suffix === '') {
        // هو، هی، انت (مذکر)، انا: یَضْرِبُ، تَضْرِبُ، تَضْرِبُ، أَضْرِبُ
        return `${prefix}${presentFaal}${ayn}${lam}`;
    } else if (suffix === 'انِ') {
        // هما: یَضْرِبَانِ، تَضْرِبَانِ
        return `${prefix}${presentFaal}${ayn}${lam}انِ`;
    } else if (suffix === 'ونَ') {
        // هم، انتم: یَضْرِبُونَ، تَضْرِبُونَ
        return `${prefix}${presentFaal}${ayn}${lam}ونَ`;
    } else if (suffix === 'ينَ') {
        // انت (مؤنث): تَضْرِبِینَ
        return `${prefix}${presentFaal}${ayn}${lam}ينَ`;
    } else if (suffix === 'نَ') {
        // هن، انتن: یَضْرِبْنَ، تَضْرِبْنَ
        return `${prefix}${presentFaal}${ayn}${lam}نَ`;
    }
    return `${prefix}${presentFaal}${ayn}${lam}${suffix}`;
}

// اضافه کردن اعراب به صرف فعل در امر
function addImperativeDiacritics(faal, ayn, lam, suffix) {
    // در امر، حرف اول ریشه (ف) ممکن است تغییر کند
    let imperativeFaal = faal;
    if (faal === 'و' || faal === 'ي') {
        imperativeFaal = 'ي';
    }
    
    if (suffix === '') {
        // انت (مذکر): اِضْرِبْ
        return `اِ${imperativeFaal}${ayn}${lam}`;
    } else if (suffix === 'ا') {
        // انتما: اِضْرِبَا
        return `اِ${imperativeFaal}${ayn}${lam}ا`;
    } else if (suffix === 'وا') {
        // انتم: اِضْرِبُوا
        return `اِ${imperativeFaal}${ayn}${lam}وا`;
    } else if (suffix === 'ي') {
        // انت (مؤنث): اِضْرِبِی
        return `اِ${imperativeFaal}${ayn}${lam}ي`;
    } else if (suffix === 'نَ') {
        // انتن: اِضْرِبْنَ
        return `اِ${imperativeFaal}${ayn}${lam}نَ`;
    }
    return `اِ${imperativeFaal}${ayn}${lam}${suffix}`;
}

// صرف فعل در زمان ماضی
function conjugatePast(verb) {
    const root = extractRoot(verb);
    if (root.length < 3) return null;
    
    const faal = root[0]; // ف
    const ayn = root[1];  // ع
    const lam = root[2];  // ل
    
    return [
        { 
            form: 'مفرد مذکر غایب',
            pronoun: 'هُوَ',
            conjugation: addPastDiacritics(faal, ayn, lam, ''),
            meaning: '(آن مرد) زد'
        },
        { 
            form: 'مثنی مذکر غایب',
            pronoun: 'هُمَا',
            conjugation: addPastDiacritics(faal, ayn, lam, 'ا'),
            meaning: '(آن دو مرد) زدند'
        },
        { 
            form: 'جمع مذکر غایب',
            pronoun: 'هُمْ',
            conjugation: addPastDiacritics(faal, ayn, lam, 'ُوا'),
            meaning: '(آن مردان) زدند'
        },
        { 
            form: 'مفرد مؤنث غایب',
            pronoun: 'هِیَ',
            conjugation: addPastDiacritics(faal, ayn, lam, 'َت'),
            meaning: '(آن زن) زد'
        },
        { 
            form: 'مثنی مؤنث غایب',
            pronoun: 'هُمَا',
            conjugation: addPastDiacritics(faal, ayn, lam, 'َتَا'),
            meaning: '(آن دو زن) زدند'
        },
        { 
            form: 'جمع مؤنث غایب',
            pronoun: 'هُنَّ',
            conjugation: addPastDiacritics(faal, ayn, lam, 'نَ'),
            meaning: '(آن زنان) زدند'
        },
        { 
            form: 'مفرد مذکر مخاطب',
            pronoun: 'أَنْتَ',
            conjugation: addPastDiacritics(faal, ayn, lam, 'تَ'),
            meaning: '(تو یک مرد) زدی'
        },
        { 
            form: 'مثنی مذکر مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addPastDiacritics(faal, ayn, lam, 'تُمَا'),
            meaning: '(شما دو مرد) زدید'
        },
        { 
            form: 'جمع مذکر مخاطب',
            pronoun: 'أَنْتُمْ',
            conjugation: addPastDiacritics(faal, ayn, lam, 'تُم'),
            meaning: '(شما مردان) زدید'
        },
        { 
            form: 'مفرد مؤنث مخاطب',
            pronoun: 'أَنْتِ',
            conjugation: addPastDiacritics(faal, ayn, lam, 'تِ'),
            meaning: '(تو یک زن) زدی'
        },
        { 
            form: 'مثنی مؤنث مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addPastDiacritics(faal, ayn, lam, 'تُمَا'),
            meaning: '(شما دو زن) زدید'
        },
        { 
            form: 'جمع مؤنث مخاطب',
            pronoun: 'أَنْتُنَّ',
            conjugation: addPastDiacritics(faal, ayn, lam, 'تُنَّ'),
            meaning: '(شما زنان) زدید'
        },
        { 
            form: 'متکلم وحده',
            pronoun: 'أَنَا',
            conjugation: addPastDiacritics(faal, ayn, lam, 'تُ'),
            meaning: '(من) زدم'
        },
        { 
            form: 'متکلم مع الغیر',
            pronoun: 'نَحْنُ',
            conjugation: addPastDiacritics(faal, ayn, lam, 'نَا'),
            meaning: '(ما) زدیم'
        }
    ];
}

// صرف فعل در زمان مضارع
function conjugatePresent(verb) {
    const root = extractRoot(verb);
    if (root.length < 3) return null;
    
    const faal = root[0]; // ف
    const ayn = root[1];  // ع
    const lam = root[2];  // ل
    
    // در مضارع، حرف اول ریشه (ف) ممکن است تغییر کند
    let presentFaal = faal;
    if (faal === 'و' || faal === 'ي') {
        presentFaal = 'ي';
    }
    
    return [
        { 
            form: 'مفرد مذکر غایب',
            pronoun: 'هُوَ',
            conjugation: addPresentDiacritics('يَ', faal, ayn, lam, ''),
            meaning: 'می‌زند (آن مرد)'
        },
        { 
            form: 'مثنی مذکر غایب',
            pronoun: 'هُمَا',
            conjugation: addPresentDiacritics('يَ', faal, ayn, lam, 'انِ'),
            meaning: 'می‌زنند (آن دو مرد)'
        },
        { 
            form: 'جمع مذکر غایب',
            pronoun: 'هُمْ',
            conjugation: addPresentDiacritics('يَ', faal, ayn, lam, 'ونَ'),
            meaning: 'می‌زنند (آن مردان)'
        },
        { 
            form: 'مفرد مؤنث غایب',
            pronoun: 'هِیَ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, ''),
            meaning: 'می‌زند (آن زن)'
        },
        { 
            form: 'مثنی مؤنث غایب',
            pronoun: 'هُمَا',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'انِ'),
            meaning: 'می‌زنند (آن دو زن)'
        },
        { 
            form: 'جمع مؤنث غایب',
            pronoun: 'هُنَّ',
            conjugation: addPresentDiacritics('يَ', faal, ayn, lam, 'نَ'),
            meaning: 'می‌زنند (آن زنان)'
        },
        { 
            form: 'مفرد مذکر مخاطب',
            pronoun: 'أَنْتَ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, ''),
            meaning: 'می‌زنی (تو یک مرد)'
        },
        { 
            form: 'مثنی مذکر مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'انِ'),
            meaning: 'می‌زنید (شما دو مرد)'
        },
        { 
            form: 'جمع مذکر مخاطب',
            pronoun: 'أَنْتُمْ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'ونَ'),
            meaning: 'می‌زنید (شما مردان)'
        },
        { 
            form: 'مفرد مؤنث مخاطب',
            pronoun: 'أَنْتِ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'ينَ'),
            meaning: 'می‌زنی (تو یک زن)'
        },
        { 
            form: 'مثنی مؤنث مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'انِ'),
            meaning: 'می‌زنید (شما دو زن)'
        },
        { 
            form: 'جمع مؤنث مخاطب',
            pronoun: 'أَنْتُنَّ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'نَ'),
            meaning: 'می‌زنید (شما زنان)'
        },
        { 
            form: 'متکلم وحده',
            pronoun: 'أَنَا',
            conjugation: addPresentDiacritics('أَ', faal, ayn, lam, ''),
            meaning: 'می‌زنم (من)'
        },
        { 
            form: 'متکلم مع الغیر',
            pronoun: 'نَحْنُ',
            conjugation: addPresentDiacritics('نَ', faal, ayn, lam, ''),
            meaning: 'می‌زنیم (ما)'
        }
    ];
}

// صرف فعل در زمان امر
function conjugateImperative(verb) {
    const root = extractRoot(verb);
    if (root.length < 3) return null;
    
    const faal = root[0]; // ف
    const ayn = root[1];  // ع
    const lam = root[2];  // ل
    
    // در امر، حرف اول ریشه (ف) ممکن است تغییر کند
    let imperativeFaal = faal;
    if (faal === 'و' || faal === 'ي') {
        imperativeFaal = 'ي';
    }
    
    // امر فقط برای دوم شخص است
    return [
        { 
            form: 'مفرد مذکر مخاطب',
            pronoun: 'أَنْتَ',
            conjugation: addImperativeDiacritics(faal, ayn, lam, ''),
            meaning: 'بزن (تو یک مرد)'
        },
        { 
            form: 'مثنی مذکر مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'ا'),
            meaning: 'بزنید (شما دو مرد)'
        },
        { 
            form: 'جمع مذکر مخاطب',
            pronoun: 'أَنْتُمْ',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'وا'),
            meaning: 'بزنید (شما مردان)'
        },
        { 
            form: 'مفرد مؤنث مخاطب',
            pronoun: 'أَنْتِ',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'ي'),
            meaning: 'بزن (تو یک زن)'
        },
        { 
            form: 'مثنی مؤنث مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'ا'),
            meaning: 'بزنید (شما دو زن)'
        },
        { 
            form: 'جمع مؤنث مخاطب',
            pronoun: 'أَنْتُنَّ',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'نَ'),
            meaning: 'بزنید (شما زنان)'
        }
    ];
}

// تابع اصلی صرف کردن
function conjugateVerb() {
    const verbInput = document.getElementById('verb-input').value.trim();
    
    if (!verbInput) {
        alert('لطفاً فعل را وارد کنید');
        return;
    }
    
    let conjugations = null;
    let tenseName = '';
    
    switch(selectedTense) {
        case 'past':
            conjugations = conjugatePast(verbInput);
            tenseName = 'ماضی';
            break;
        case 'present':
            conjugations = conjugatePresent(verbInput);
            tenseName = 'مضارع';
            break;
        case 'imperative':
            conjugations = conjugateImperative(verbInput);
            tenseName = 'امر';
            break;
    }
    
    if (!conjugations || conjugations.length === 0) {
        alert('فعل وارد شده معتبر نیست. لطفاً فعل را به صورت صحیح وارد کنید (مثال: کَتَبَ)');
        return;
    }
    
    // نمایش نتیجه
    displayResult(verbInput, tenseName, conjugations);
}

// نمایش نتیجه در جدول
function displayResult(verb, tenseName, conjugations) {
    const resultSection = document.getElementById('result-section');
    const resultTitle = document.getElementById('result-title');
    const tableContainer = document.getElementById('conjugation-table');
    
    resultTitle.textContent = `صرف فعل "${verb}" در زمان ${tenseName}`;
    
    // ایجاد جدول با 4 ستون
    let tableHTML = `
        <table>
            <thead>
                <tr>
                    <th>صیغه</th>
                    <th>ضمیر</th>
                    <th>فعل</th>
                    <th>معنی</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    conjugations.forEach(item => {
        tableHTML += `
            <tr>
                <td class="form-label">${item.form}</td>
                <td class="pronoun-label">${item.pronoun}</td>
                <td class="arabic-text">${item.conjugation}</td>
                <td class="meaning-text">${item.meaning}</td>
            </tr>
        `;
    });
    
    tableHTML += `
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = tableHTML;
    resultSection.classList.remove('hidden');
    
    // اسکرول به نتیجه
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// بستن بخش نتیجه
function closeResult() {
    document.getElementById('result-section').classList.add('hidden');
}

// امکان استفاده از Enter برای صرف کردن
document.addEventListener('DOMContentLoaded', function() {
    const verbInput = document.getElementById('verb-input');
    
    verbInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            conjugateVerb();
        }
    });
});
