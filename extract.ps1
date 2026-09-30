$ErrorActionPreference = "SilentlyContinue"
$bytes = [IO.File]::ReadAllBytes("CERTIFICATE - UZONNAH ELECTRICAL SERVICES.pdf")
$text = [Text.Encoding]::ASCII.GetString($bytes)
$sb = New-Object Text.StringBuilder
$pos = 0
while ($true) {
  $s = $text.IndexOf("stream", $pos)
  if ($s -lt 0) { break }
  if ($text.Substring([Math]::Max(0,$s-1), 3) -like "*s*") {}
  $dataStart = $s + 6
  $e = $text.IndexOf("endstream", $dataStart)
  if ($e -lt 0) { break }
  $len = $e - $dataStart
  while ($len -gt 0 -and ($text[$dataStart] -eq "`r" -or $text[$dataStart] -eq "`n")) { $dataStart++; $len-- }
  $data = New-Object byte[] $len
  [Array]::Copy($bytes, $dataStart, $data, 0, $len)
  foreach ($skip in 0, 2) {
    if ($skip -ge $len) { continue }
    $sub = $data[$skip..($len-1)]
    $ms = New-Object IO.MemoryStream(,$sub)
    $ds = New-Object IO.Compression.DeflateStream($ms, [IO.Compression.CompressionMode]::Decompress)
    $out = New-Object IO.MemoryStream
    try { $ds.CopyTo($out) } catch { $ds.Dispose(); continue }
    $dec = [Text.Encoding]::ASCII.GetString($out.ToArray())
    [void]$sb.AppendLine("=== STREAM skip=$skip len=$len ===")
    [void]$sb.AppendLine($dec)
    break
  }
  $pos = $e + 9
}
[IO.File]::WriteAllText("extracted.txt", $sb.ToString())
"DONE len=" + $sb.Length
