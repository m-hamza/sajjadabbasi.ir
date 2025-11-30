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

// صرف فعل در زمان ماضی (بدون اعراب)
function conjugatePast(verb) {
    const root = extractRoot(verb);
    if (root.length < 3) return null;
    
    const faal = root[0]; // ف
    const ayn = root[1];  // ع
    const lam = root[2];  // ل
    
    return {
        root: root,
        conjugations: [
            { 
                form: 'مفرد مذکر غایب',
                pronoun: 'هُوَ',
                conjugation: `${faal}${ayn}${lam}`,
                meaning: '(آن مرد) زد'
            },
            { 
                form: 'مثنی مذکر غایب',
                pronoun: 'هُمَا',
                conjugation: `${faal}${ayn}${lam}ا`,
                meaning: '(آن دو مرد) زدند'
            },
            { 
                form: 'جمع مذکر غایب',
                pronoun: 'هُمْ',
                conjugation: `${faal}${ayn}${lam}وا`,
                meaning: '(آن مردان) زدند'
            },
            { 
                form: 'مفرد مؤنث غایب',
                pronoun: 'هِیَ',
                conjugation: `${faal}${ayn}${lam}ت`,
                meaning: '(آن زن) زد'
            },
            { 
                form: 'مثنی مؤنث غایب',
                pronoun: 'هُمَا',
                conjugation: `${faal}${ayn}${lam}تا`,
                meaning: '(آن دو زن) زدند'
            },
            { 
                form: 'جمع مؤنث غایب',
                pronoun: 'هُنَّ',
                conjugation: `${faal}${ayn}${lam}ن`,
                meaning: '(آن زنان) زدند'
            },
            { 
                form: 'مفرد مذکر مخاطب',
                pronoun: 'أَنْتَ',
                conjugation: `${faal}${ayn}${lam}ت`,
                meaning: '(تو یک مرد) زدی'
            },
            { 
                form: 'مثنی مذکر مخاطب',
                pronoun: 'أَنْتُمَا',
                conjugation: `${faal}${ayn}${lam}تما`,
                meaning: '(شما دو مرد) زدید'
            },
            { 
                form: 'جمع مذکر مخاطب',
                pronoun: 'أَنْتُمْ',
                conjugation: `${faal}${ayn}${lam}تم`,
                meaning: '(شما مردان) زدید'
            },
            { 
                form: 'مفرد مؤنث مخاطب',
                pronoun: 'أَنْتِ',
                conjugation: `${faal}${ayn}${lam}ت`,
                meaning: '(تو یک زن) زدی'
            },
            { 
                form: 'مثنی مؤنث مخاطب',
                pronoun: 'أَنْتُمَا',
                conjugation: `${faal}${ayn}${lam}تما`,
                meaning: '(شما دو زن) زدید'
            },
            { 
                form: 'جمع مؤنث مخاطب',
                pronoun: 'أَنْتُنَّ',
                conjugation: `${faal}${ayn}${lam}تن`,
                meaning: '(شما زنان) زدید'
            },
            { 
                form: 'متکلم وحده',
                pronoun: 'أَنَا',
                conjugation: `${faal}${ayn}${lam}ت`,
                meaning: '(من) زدم'
            },
            { 
                form: 'متکلم مع الغیر',
                pronoun: 'نَحْنُ',
                conjugation: `${faal}${ayn}${lam}نا`,
                meaning: '(ما) زدیم'
            }
        ]
    };
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
            conjugation: `ي${presentFaal}${ayn}${lam}`,
            meaning: 'می‌زند (آن مرد)'
        },
        { 
            form: 'مثنی مذکر غایب',
            pronoun: 'هُمَا',
            conjugation: `ي${presentFaal}${ayn}${lam}ان`,
            meaning: 'می‌زنند (آن دو مرد)'
        },
        { 
            form: 'جمع مذکر غایب',
            pronoun: 'هُمْ',
            conjugation: `ي${presentFaal}${ayn}${lam}ون`,
            meaning: 'می‌زنند (آن مردان)'
        },
        { 
            form: 'مفرد مؤنث غایب',
            pronoun: 'هِیَ',
            conjugation: `ت${presentFaal}${ayn}${lam}`,
            meaning: 'می‌زند (آن زن)'
        },
        { 
            form: 'مثنی مؤنث غایب',
            pronoun: 'هُمَا',
            conjugation: `ت${presentFaal}${ayn}${lam}ان`,
            meaning: 'می‌زنند (آن دو زن)'
        },
        { 
            form: 'جمع مؤنث غایب',
            pronoun: 'هُنَّ',
            conjugation: `ي${presentFaal}${ayn}${lam}ن`,
            meaning: 'می‌زنند (آن زنان)'
        },
        { 
            form: 'مفرد مذکر مخاطب',
            pronoun: 'أَنْتَ',
            conjugation: `ت${presentFaal}${ayn}${lam}`,
            meaning: 'می‌زنی (تو یک مرد)'
        },
        { 
            form: 'مثنی مذکر مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: `ت${presentFaal}${ayn}${lam}ان`,
            meaning: 'می‌زنید (شما دو مرد)'
        },
        { 
            form: 'جمع مذکر مخاطب',
            pronoun: 'أَنْتُمْ',
            conjugation: `ت${presentFaal}${ayn}${lam}ون`,
            meaning: 'می‌زنید (شما مردان)'
        },
        { 
            form: 'مفرد مؤنث مخاطب',
            pronoun: 'أَنْتِ',
            conjugation: `ت${presentFaal}${ayn}${lam}ين`,
            meaning: 'می‌زنی (تو یک زن)'
        },
        { 
            form: 'مثنی مؤنث مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: `ت${presentFaal}${ayn}${lam}ان`,
            meaning: 'می‌زنید (شما دو زن)'
        },
        { 
            form: 'جمع مؤنث مخاطب',
            pronoun: 'أَنْتُنَّ',
            conjugation: `ت${presentFaal}${ayn}${lam}ن`,
            meaning: 'می‌زنید (شما زنان)'
        },
        { 
            form: 'متکلم وحده',
            pronoun: 'أَنَا',
            conjugation: `أ${presentFaal}${ayn}${lam}`,
            meaning: 'می‌زنم (من)'
        },
        { 
            form: 'متکلم مع الغیر',
            pronoun: 'نَحْنُ',
            conjugation: `ن${presentFaal}${ayn}${lam}`,
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
            conjugation: `ا${imperativeFaal}${ayn}${lam}`,
            meaning: 'بزن (تو یک مرد)'
        },
        { 
            form: 'مثنی مذکر مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: `ا${imperativeFaal}${ayn}${lam}ا`,
            meaning: 'بزنید (شما دو مرد)'
        },
        { 
            form: 'جمع مذکر مخاطب',
            pronoun: 'أَنْتُمْ',
            conjugation: `ا${imperativeFaal}${ayn}${lam}وا`,
            meaning: 'بزنید (شما مردان)'
        },
        { 
            form: 'مفرد مؤنث مخاطب',
            pronoun: 'أَنْتِ',
            conjugation: `ا${imperativeFaal}${ayn}${lam}ي`,
            meaning: 'بزن (تو یک زن)'
        },
        { 
            form: 'مثنی مؤنث مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: `ا${imperativeFaal}${ayn}${lam}ا`,
            meaning: 'بزنید (شما دو زن)'
        },
        { 
            form: 'جمع مؤنث مخاطب',
            pronoun: 'أَنْتُنَّ',
            conjugation: `ا${imperativeFaal}${ayn}${lam}ن`,
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
    
    let result = null;
    let tenseName = '';
    
    switch(selectedTense) {
        case 'past':
            result = conjugatePast(verbInput);
            tenseName = 'ماضی';
            break;
        case 'present':
            result = conjugatePresent(verbInput);
            tenseName = 'مضارع';
            break;
        case 'imperative':
            result = conjugateImperative(verbInput);
            tenseName = 'امر';
            break;
    }
    
    if (!result || (selectedTense === 'past' && !result.conjugations) || (selectedTense !== 'past' && result.length === 0)) {
        alert('فعل وارد شده معتبر نیست. لطفاً فعل را به صورت صحیح وارد کنید (مثال: کَتَبَ)');
        return;
    }
    
    // نمایش نتیجه
    if (selectedTense === 'past') {
        displayResult(verbInput, tenseName, result.conjugations, result.root);
    } else {
        displayResult(verbInput, tenseName, result, null);
    }
}

// نمایش نتیجه در جدول
function displayResult(verb, tenseName, conjugations, root) {
    const resultSection = document.getElementById('result-section');
    const resultTitle = document.getElementById('result-title');
    const rootInfo = document.getElementById('root-info');
    const tableContainer = document.getElementById('conjugation-table');
    
    resultTitle.textContent = `صرف فعل "${verb}" در زمان ${tenseName}`;
    
    // نمایش ریشه برای ماضی
    if (root && tenseName === 'ماضی') {
        rootInfo.innerHTML = `
            <strong>سه حرف اصلی ریشه:</strong>
            <span class="root-letters">${root[0]} - ${root[1]} - ${root[2]}</span>
            <strong>(${root})</strong>
        `;
        rootInfo.classList.remove('hidden');
    } else {
        rootInfo.classList.add('hidden');
    }
    
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

