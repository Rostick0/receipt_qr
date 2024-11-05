@extends('layout.index')

@section('html')
    <div class="page-index">
        <div class="container mx-auto">
            <div class="page-index__container flex items-start gap-12">
                <div class="receipt grow text-xl py-6 px-12">
                    <div class="">
                        <div class="text-center mb-1">КАССОВЫЙ ЧЕК</div>
                        <div class="text-center mb-1">ООО Конфеты</div>
                        <div class="text-center">ИНН 45403304343258</div>
                    </div>
                    <div class="my-6">
                        <div class="mb-2.5">Г. Москва, ул. Центральная, дом 63</div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ЧЕК</span>
                            <span>25</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>13.08.2024</span>
                            <span>12:20</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>Смена</span>
                            <span>4</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>Приход</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>СНО</span>
                            <span>УСН</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>Кассир</span>
                            <span>Иванов И.И.</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>СРН ККТНО</span>
                            <span>0012305430213444</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>Карандаш</span>
                            <span>1 шт * 23.00 ₽ =</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>Тетрадь 24л.</span>
                            <span>1 шт * 57.00 ₽ =</span>
                        </div>
                        <div class="flex items-center justify-between font-bold mb-2.5">
                            <span>ИТОГ</span>
                            <span>= 80.00 ₽</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>НАЛИЧНЫМИ</span>
                            <span>= 80.00 ₽ </span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ПОЛУЧЕНО</span>
                            <span>= 80.00 ₽</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>СУММА БЕЗ НДС</span>
                            <span>= 80.00 ₽ </span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ФН</span>
                            <span>94250729345</span>
                        </div>
                        <div class="flex items-center justify-between mb-2.5">
                            <span>ФД</span>
                            <span>235</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span>ФПД</span>
                            <span>12342136589</span>
                        </div>
                    </div>
                    <div class="receipt__image flex max-w-52 mx-auto">
                        <img class="receipt__img" src="/images/qr_code.png" alt="Проверка чека" decoding="async"
                            loading="lazy">
                    </div>
                </div>

                <div class="page-index__container_right w-full">
                    <div class="page-index__search search p-6 mb-24">
                        <div class="search__title text-4xl mb-3 text-center font-extrabold">Поиск чека</div>
                        <div class="search__switch flex gap-x-7 mb-6">
                            <div class="search__switch_item active">Ручной ввод</div>
                            <div class="search__switch_item">Сканирование QR-кода</div>
                        </div>
                        <form class="page-index__form flex flex-col gap-y-6" action="">
                            <x-field label="ФН" name="fiscalDriveNumber" placeholder="1948502912138934205" />
                            <x-field label="ФД" name="fiscalDocumentNumber" placeholder="1948502912138934205" />
                            <x-field label="ФПД" name="fiscalSign" placeholder="1948502912138934205" />
                            <x-field label="Дата" type="datetime-local" name="dateTime"
                                placeholder="1948502912138934205" />

                            {{-- <div class="grid grid-cols-2 gap-x-2.5 items-end">
                            <x-field type="date" placeholder="1948502912138934205" />
                            <x-field type="time" placeholder="1948502912138934205" />
                                </div> --}}
                            <x-field label="Сумма" name="1" placeholder="000 000 000 ₽" />
                            <div class="flex gap-x-6">
                                <x-select label="Тип" name="operationType" :options="$options_operation_type" />
                                <button class="btn grow">Найти</button>
                            </div>
                        </form>
                    </div>
                    <div class="page-index__rules">
                        <h2 class="font-bold border-b border-black mb-4 pb-4">Обязательные реквизиты на бумажном кассовом
                            чеке
                            согласно
                            требованиям
                            №54-ФЗ:
                        </h2>
                        <p class="mb-4">С 1 июля 2021 года все компании и индивидуальные предприниматели, принимающие
                            платежи,
                            обязаны
                            использовать
                            онлайн-кассы. В связи с этим, каждый кассовый чек должен содержать определенные обязательные
                            реквизиты для
                            подтверждения подлинности транзакции, включая QR-код, который содержит закодированные данные для
                            проверки.
                        </p>
                        <figure>
                            <figcaption class="mb-4">Основные реквизиты кассового чека:</figcaption>
                            <ol>
                                <li>Тип документа (кассовый чек).</li>
                                <li>Название организации или индивидуального предпринимателя.</li>
                                <li>Номер чека в рамках текущей смены.</li>
                                <li>Дата и время проведения расчета, а также адрес точки продаж.</li>
                                <li>Система налогообложения, применяемая продавцом.</li>
                                <li>Признак расчета (например, продажа или возврат).</li>
                                <li>Перечень наименований товаров, работ или услуг и их количество.</li>
                                <li>Стоимость единицы товара/услуги.</li>
                                <li>Итоговая сумма чека, информация о НДС и налоговой ставке.</li>
                                <li>Способ оплаты (наличные или безналичные).</li>
                                <li>Регистрационный номер контрольно-кассовой техники (ККТ).</li>
                                <li>Уникальный номер фискального накопителя.</li>
                                <li>Фискальный признак документа (ФП или ФПД).</li>
                                <li>Номер фискального документа (ФД).</li>
                                <li>QR-код для проверки чека</li>
                            </ol>
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
