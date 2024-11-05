<label class="flex items-start gap-x-6">
    @if ($label)
        <span>{{ $label }}</span>
    @endif
    <select class="select border-b border-solid border-black grow pb-2.5" name="{{ $name }}">
        @isset($placeholder)
            <option value="" hidden>{{ $placeholder }}</option>
        @endisset
        @foreach ($options as $option)
            <option value="{{ $option['value'] }}">{{ $option['name'] }}</option>
        @endforeach
    </select>
</label>
