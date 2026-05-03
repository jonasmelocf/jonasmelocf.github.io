export function stack() {
	return `
  <table>
    <thead>
      <tr class="*:p-2 border"><th>Back end</th><th>Front end</th><th>Database</th></tr>
    </thead>
    <tbody>
      <tr class="*:p-2">
        <td>Hono</td>
        <td>React</td>
        <td>PostgreSQL</td>
      </tr>
      <tr class="*:p-2">
        <td>Express</td>
        <td>VueJS</td>
        <td>MySQL</td>
      </tr>
      <tr class="*:p-2">
        <td>NextJS</td>
        <td></td>
        <td>MongoDB</td>
      </tr>
      <tr class="*:p-2">
        <td>NestJS</td>
        <td></td>
        <td></td>
      </tr>
    </tbody>
  </table>
`;
}
