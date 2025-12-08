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

// اضافه کردن اعراب با رنگ قرمز
function addDiacriticRed(letter, diacritic) {
    if (diacritic) {
        return `${letter}<span class="diacritic-red">${diacritic}</span>`;
    }
    return letter;
}

// صرف فعل در زمان ماضی با اعراب قرمز
function addPastDiacritics(faal, ayn, lam, suffix) {
    if (suffix === '') {
        // هو: ضَرَبَ
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'َ')}${lam}`;
    } else if (suffix === 'ا') {
        // هما (مذکر): ضَرَبَا
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'َ')}${lam}ا`;
    } else if (suffix === 'وا') {
        // هم: ضَرَبُوا
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('و', 'ُ')}ا`;
    } else if (suffix === 'ت') {
        // هی: ضَرَبَتْ
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('ت', 'ْ')}`;
    } else if (suffix === 'تا') {
        // هما (مؤنث): ضَرَبَتَا
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'َ')}${lam}ت${addDiacriticRed('ا', 'َ')}`;
    } else if (suffix === 'ن') {
        // هن: ضَرَبْنَ
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('ن', 'َ')}`;
    } else if (suffix === 'ت') {
        // انت (مذکر): ضَرَبْتَ
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('ت', 'َ')}`;
    } else if (suffix === 'تما') {
        // انتما: ضَرَبْتُمَا
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'ْ')}ت${addDiacriticRed('و', 'ُ')}م${addDiacriticRed('ا', 'َ')}`;
    } else if (suffix === 'تم') {
        // انتم: ضَرَبْتُمْ
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'ْ')}ت${addDiacriticRed('و', 'ُ')}م`;
    } else if (suffix === 'ت') {
        // انت (مؤنث): ضَرَبْتِ
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'ْ')}ت${addDiacriticRed('', 'ِ')}`;
    } else if (suffix === 'تن') {
        // انتن: ضَرَبْتُنَّ
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'ْ')}ت${addDiacriticRed('و', 'ُ')}نَّ`;
    } else if (suffix === 'ت') {
        // انا: ضَرَبْتُ
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'ْ')}ت${addDiacriticRed('', 'ُ')}`;
    } else if (suffix === 'نا') {
        // نحن: ضَرَبْنَا
        return `${addDiacriticRed(faal, 'َ')}${addDiacriticRed(ayn, 'ْ')}ن${addDiacriticRed('ا', 'َ')}`;
    }
    return `${faal}${ayn}${lam}${suffix}`;
}

// صرف فعل در زمان مضارع با اعراب قرمز
function addPresentDiacritics(prefix, faal, ayn, lam, suffix) {
    let presentFaal = faal;
    if (faal === 'و' || faal === 'ي') {
        presentFaal = 'ي';
    }

    if (suffix === '') {
        // هو، هی، انت (مذکر)، انا: یَضْرِبُ، تَضْرِبُ، تَضْرِبُ، أَضْرِبُ
        return `${prefix}${addDiacriticRed(presentFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${addDiacriticRed(lam, 'ُ')}`;
    } else if (suffix === 'ان') {
        // هما: یَضْرِبَانِ، تَضْرِبَانِ
        return `${prefix}${addDiacriticRed(presentFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('ا', 'َ')}ن${addDiacriticRed('', 'ِ')}`;
    } else if (suffix === 'ون') {
        // هم، انتم: یَضْرِبُونَ، تَضْرِبُونَ
        return `${prefix}${addDiacriticRed(presentFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('و', 'ُ')}ن${addDiacriticRed('', 'َ')}`;
    } else if (suffix === 'ين') {
        // انت (مؤنث): تَضْرِبِینَ
        return `${prefix}${addDiacriticRed(presentFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${lam}ي${addDiacriticRed('ن', 'َ')}`;
    } else if (suffix === 'ن') {
        // هن، انتن: یَضْرِبْنَ، تَضْرِبْنَ
        return `${prefix}${addDiacriticRed(presentFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('ن', 'َ')}`;
    }
    return `${prefix}${presentFaal}${ayn}${lam}${suffix}`;
}

// صرف فعل در زمان امر با اعراب قرمز
function addImperativeDiacritics(faal, ayn, lam, suffix) {
    let imperativeFaal = faal;
    if (faal === 'و' || faal === 'ي') {
        imperativeFaal = 'ي';
    }

    if (suffix === '') {
        // انت (مذکر): اِضْرِبْ
        return `${addDiacriticRed('ا', 'ِ')}${addDiacriticRed(imperativeFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${addDiacriticRed(lam, 'ْ')}`;
    } else if (suffix === 'ا') {
        // انتما: اِضْرِبَا
        return `${addDiacriticRed('ا', 'ِ')}${addDiacriticRed(imperativeFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('ا', 'َ')}`;
    } else if (suffix === 'وا') {
        // انتم: اِضْرِبُوا
        return `${addDiacriticRed('ا', 'ِ')}${addDiacriticRed(imperativeFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('و', 'ُ')}ا`;
    } else if (suffix === 'ي') {
        // انت (مؤنث): اِضْرِبِی
        return `${addDiacriticRed('ا', 'ِ')}${addDiacriticRed(imperativeFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('ي', '')}`;
    } else if (suffix === 'ن') {
        // انتن: اِضْرِبْنَ
        return `${addDiacriticRed('ا', 'ِ')}${addDiacriticRed(imperativeFaal, 'ْ')}${addDiacriticRed(ayn, 'َ')}${lam}${addDiacriticRed('ن', 'َ')}`;
    }
    return `${addDiacriticRed('ا', 'ِ')}${imperativeFaal}${ayn}${lam}${suffix}`;
}

// صرف فعل در زمان ماضی با اعراب قرمز
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
                conjugation: addPastDiacritics(faal, ayn, lam, ''),
                meaning: 'او (مذکر) در گذشته انجام داد'
            },
            {
                form: 'مثنی مذکر غایب',
                pronoun: 'هُمَا',
                conjugation: addPastDiacritics(faal, ayn, lam, 'ا'),
                meaning: 'آن دو (مذکر) در گذشته انجام دادند'
            },
            {
                form: 'جمع مذکر غایب',
                pronoun: 'هُمْ',
                conjugation: addPastDiacritics(faal, ayn, lam, 'وا'),
                meaning: 'آن‌ها (مذکر) در گذشته انجام دادند'
            },
            {
                form: 'مفرد مؤنث غایب',
                pronoun: 'هِیَ',
                conjugation: addPastDiacritics(faal, ayn, lam, 'ت'),
                meaning: 'او (مؤنث) در گذشته انجام داد'
            },
            {
                form: 'مثنی مؤنث غایب',
                pronoun: 'هُمَا',
                conjugation: addPastDiacritics(faal, ayn, lam, 'تا'),
                meaning: 'آن دو (مؤنث) در گذشته انجام دادند'
            },
            {
                form: 'جمع مؤنث غایب',
                pronoun: 'هُنَّ',
                conjugation: addPastDiacritics(faal, ayn, lam, 'ن'),
                meaning: 'آن‌ها (مؤنث) در گذشته انجام دادند'
            },
            {
                form: 'مفرد مذکر مخاطب',
                pronoun: 'أَنْتَ',
                conjugation: addPastDiacritics(faal, ayn, lam, 'ت'),
                meaning: 'تو (مذکر) در گذشته انجام دادی'
            },
            {
                form: 'مثنی مذکر مخاطب',
                pronoun: 'أَنْتُمَا',
                conjugation: addPastDiacritics(faal, ayn, lam, 'تما'),
                meaning: 'شما دو (مذکر) در گذشته انجام دادید'
            },
            {
                form: 'جمع مذکر مخاطب',
                pronoun: 'أَنْتُمْ',
                conjugation: addPastDiacritics(faal, ayn, lam, 'تم'),
                meaning: 'شما (مذکر) در گذشته انجام دادید'
            },
            {
                form: 'مفرد مؤنث مخاطب',
                pronoun: 'أَنْتِ',
                conjugation: addPastDiacritics(faal, ayn, lam, 'ت'),
                meaning: 'تو (مؤنث) در گذشته انجام دادی'
            },
            {
                form: 'مثنی مؤنث مخاطب',
                pronoun: 'أَنْتُمَا',
                conjugation: addPastDiacritics(faal, ayn, lam, 'تما'),
                meaning: 'شما دو (مؤنث) در گذشته انجام دادید'
            },
            {
                form: 'جمع مؤنث مخاطب',
                pronoun: 'أَنْتُنَّ',
                conjugation: addPastDiacritics(faal, ayn, lam, 'تن'),
                meaning: 'شما (مؤنث) در گذشته انجام دادید'
            },
            {
                form: 'متکلم وحده',
                pronoun: 'أَنَا',
                conjugation: addPastDiacritics(faal, ayn, lam, 'ت'),
                meaning: 'من در گذشته انجام دادم'
            },
            {
                form: 'متکلم مع الغیر',
                pronoun: 'نَحْنُ',
                conjugation: addPastDiacritics(faal, ayn, lam, 'نا'),
                meaning: 'ما در گذشته انجام دادیم'
            }
        ]
    };
}

// صرف فعل در زمان مضارع با اعراب قرمز
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
            meaning: 'او (مذکر) در حال انجام می‌دهد'
        },
        {
            form: 'مثنی مذکر غایب',
            pronoun: 'هُمَا',
            conjugation: addPresentDiacritics('يَ', faal, ayn, lam, 'ان'),
            meaning: 'آن دو (مذکر) در حال انجام می‌دهند'
        },
        {
            form: 'جمع مذکر غایب',
            pronoun: 'هُمْ',
            conjugation: addPresentDiacritics('يَ', faal, ayn, lam, 'ون'),
            meaning: 'آن‌ها (مذکر) در حال انجام می‌دهند'
        },
        {
            form: 'مفرد مؤنث غایب',
            pronoun: 'هِیَ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, ''),
            meaning: 'او (مؤنث) در حال انجام می‌دهد'
        },
        {
            form: 'مثنی مؤنث غایب',
            pronoun: 'هُمَا',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'ان'),
            meaning: 'آن دو (مؤنث) در حال انجام می‌دهند'
        },
        {
            form: 'جمع مؤنث غایب',
            pronoun: 'هُنَّ',
            conjugation: addPresentDiacritics('يَ', faal, ayn, lam, 'ن'),
            meaning: 'آن‌ها (مؤنث) در حال انجام می‌دهند'
        },
        {
            form: 'مفرد مذکر مخاطب',
            pronoun: 'أَنْتَ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, ''),
            meaning: 'تو (مذکر) در حال انجام می‌دهی'
        },
        {
            form: 'مثنی مذکر مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'ان'),
            meaning: 'شما دو (مذکر) در حال انجام می‌دهید'
        },
        {
            form: 'جمع مذکر مخاطب',
            pronoun: 'أَنْتُمْ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'ون'),
            meaning: 'شما (مذکر) در حال انجام می‌دهید'
        },
        {
            form: 'مفرد مؤنث مخاطب',
            pronoun: 'أَنْتِ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'ين'),
            meaning: 'تو (مؤنث) در حال انجام می‌دهی'
        },
        {
            form: 'مثنی مؤنث مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'ان'),
            meaning: 'شما دو (مؤنث) در حال انجام می‌دهید'
        },
        {
            form: 'جمع مؤنث مخاطب',
            pronoun: 'أَنْتُنَّ',
            conjugation: addPresentDiacritics('تَ', faal, ayn, lam, 'ن'),
            meaning: 'شما (مؤنث) در حال انجام می‌دهید'
        },
        {
            form: 'متکلم وحده',
            pronoun: 'أَنَا',
            conjugation: addPresentDiacritics('أَ', faal, ayn, lam, ''),
            meaning: 'من در حال انجام می‌دهم'
        },
        {
            form: 'متکلم مع الغیر',
            pronoun: 'نَحْنُ',
            conjugation: addPresentDiacritics('نَ', faal, ayn, lam, ''),
            meaning: 'ما در حال انجام می‌دهیم'
        }
    ];
}

// صرف فعل در زمان امر با اعراب قرمز
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
            meaning: 'تو (مذکر) دستور انجام بده'
        },
        {
            form: 'مثنی مذکر مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'ا'),
            meaning: 'شما دو (مذکر) دستور انجام بدهید'
        },
        {
            form: 'جمع مذکر مخاطب',
            pronoun: 'أَنْتُمْ',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'وا'),
            meaning: 'شما (مذکر) دستور انجام بدهید'
        },
        {
            form: 'مفرد مؤنث مخاطب',
            pronoun: 'أَنْتِ',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'ي'),
            meaning: 'تو (مؤنث) دستور انجام بده'
        },
        {
            form: 'مثنی مؤنث مخاطب',
            pronoun: 'أَنْتُمَا',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'ا'),
            meaning: 'شما دو (مؤنث) دستور انجام بدهید'
        },
        {
            form: 'جمع مؤنث مخاطب',
            pronoun: 'أَنْتُنَّ',
            conjugation: addImperativeDiacritics(faal, ayn, lam, 'ن'),
            meaning: 'شما (مؤنث) دستور انجام بدهید'
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

    switch (selectedTense) {
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
document.addEventListener('DOMContentLoaded', function () {
    const verbInput = document.getElementById('verb-input');

    verbInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            conjugateVerb();
        }
    });
});

